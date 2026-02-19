#!/usr/bin/env python3
"""
Commit pending blog markdown changes under content/blog/.

Default behavior:
- Commits only blog post markdown files: content/blog/**/*.md
  - Excludes: content/blog/README.md, content/blog/_ops/**, content/blog/_templates/**, any content/blog/_* paths
- Skips deletions
- Batches commits (default batch size: 25) to avoid creating hundreds of commits
- Commit subject format: "blog post added - <slug>"
  - Uses the first slug in the batch for the subject
  - Adds the full slug list in the commit body

Examples:
  python3 scripts/commit-blog-posts.py --dry-run
  python3 scripts/commit-blog-posts.py --batch-size 40
  python3 scripts/commit-blog-posts.py --per-file   # one commit per file (slow)
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path
from typing import Iterable, Iterator, List, Sequence, Tuple


def run(cmd: Sequence[str], *, check: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, check=check, text=True, capture_output=True)


def git(args: Sequence[str], *, check: bool = True) -> subprocess.CompletedProcess[str]:
    return run(["git", *args], check=check)


def get_repo_root() -> Path:
    root = git(["rev-parse", "--show-toplevel"]).stdout.strip()
    if not root:
        raise RuntimeError("Unable to resolve git repo root.")
    return Path(root)


def chunk(items: Sequence[str], size: int) -> List[List[str]]:
    return [list(items[i : i + size]) for i in range(0, len(items), size)]


def parse_porcelain_z(raw: str) -> Iterator[Tuple[str, str]]:
    """
    Parse `git status --porcelain=v1 -z` output.

    Yields: (statusXY, path) where path is the *new* path for renames/copies.
    """
    tokens = raw.split("\0")
    i = 0
    while i < len(tokens):
        token = tokens[i]
        i += 1
        if not token:
            continue

        status = token[:2]
        path = token[3:] if len(token) >= 4 else ""

        # In -z mode, renames/copies have a second path token (new path).
        if ("R" in status) or ("C" in status):
            if i < len(tokens):
                new_path = tokens[i]
                i += 1
                if new_path:
                    path = new_path

        yield status, path


def is_blog_post_markdown(path: str) -> bool:
    if not path.startswith("content/blog/"):
        return False
    if not path.endswith(".md"):
        return False
    if path == "content/blog/README.md":
        return False
    # Exclude any underscore-prefixed folders/files under content/blog
    # (e.g. _ops, _templates, _drafts, etc.)
    rel = path[len("content/blog/") :]
    if rel.startswith("_"):
        return False
    if "/_" in rel:
        return False
    return True


def get_changed_blog_posts(repo_root: Path) -> List[Tuple[str, str]]:
    raw = git(["status", "--porcelain=v1", "-z", "--", "content/blog"]).stdout
    changed: List[Tuple[str, str]] = []
    for status, path in parse_porcelain_z(raw):
        if not path:
            continue
        if not is_blog_post_markdown(path):
            continue
        # Skip deletions
        if "D" in status:
            continue
        abs_path = repo_root / path
        if not abs_path.exists():
            continue
        changed.append((status, path))

    # Deterministic order (path only)
    changed.sort(key=lambda x: x[1])
    return changed


_FRONTMATTER_RE = re.compile(r"^---\s*$", re.MULTILINE)
_SLUG_RE = re.compile(r'^\s*slug:\s*["\']?([^"\']+)["\']?\s*$', re.MULTILINE)


def extract_slug(repo_root: Path, rel_path: str) -> str:
    abs_path = repo_root / rel_path
    text = abs_path.read_text(encoding="utf-8", errors="replace")
    # Find frontmatter block
    matches = list(_FRONTMATTER_RE.finditer(text))
    if len(matches) >= 2:
        start = matches[0].end()
        end = matches[1].start()
        fm = text[start:end]
        m = _SLUG_RE.search(fm)
        if m:
            return m.group(1).strip()

    # Fallback to filename stem
    return abs_path.stem


def get_staged_paths() -> List[str]:
    raw = git(["diff", "--cached", "--name-only", "-z"]).stdout
    if not raw:
        return []
    return [p for p in raw.split("\0") if p]


def ensure_no_non_blog_staged_changes() -> None:
    staged = get_staged_paths()
    non_blog = [p for p in staged if not p.startswith("content/blog/")]
    if non_blog:
        joined = "\n".join(f"- {p}" for p in non_blog)
        raise RuntimeError(
            "Refusing to commit blog posts while non-blog files are staged.\n"
            "Unstage these first (or commit them separately):\n"
            f"{joined}"
        )


def git_add(paths: Sequence[str]) -> None:
    if not paths:
        return
    git(["add", "--", *paths])


def git_commit(subject: str, body: str) -> None:
    # Use -m twice: subject + body
    git(["commit", "-m", subject, "-m", body])


def main(argv: Sequence[str]) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Print planned commits without committing.")
    parser.add_argument("--batch-size", type=int, default=25, help="Files per commit (default: 25).")
    parser.add_argument("--per-file", action="store_true", help="Commit one file per commit (slow).")
    args = parser.parse_args(list(argv))

    if args.batch_size <= 0:
        print("batch-size must be > 0", file=sys.stderr)
        return 2

    repo_root = get_repo_root()
    ensure_no_non_blog_staged_changes()

    changed = get_changed_blog_posts(repo_root)
    if not changed:
        print("No pending blog markdown changes under content/blog/.")
        return 0

    paths = [p for _, p in changed]
    slug_by_path = {p: extract_slug(repo_root, p) for p in paths}

    # Build commit groups
    if args.per_file:
        groups = [[p] for p in paths]
    else:
        groups = chunk(paths, args.batch_size)

    print(f"Found {len(paths)} blog post files to commit.")
    print(f"Planned commits: {len(groups)} (per_file={args.per_file}, batch_size={args.batch_size})")

    for idx, group in enumerate(groups, start=1):
        slugs = [slug_by_path[p] for p in group]
        subject = f"blog post added - {slugs[0]}"
        body_lines = [
            f"Committed {len(group)} blog post file(s).",
            "",
            "Slugs:",
            *[f"- {slug}" for slug in slugs],
        ]
        body = "\n".join(body_lines)

        print(f"\n[{idx}/{len(groups)}] {subject}")
        if args.dry_run:
            print("Files:")
            for p in group:
                print(f"- {p}")
            continue

        git_add(group)
        git_commit(subject, body)

    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

