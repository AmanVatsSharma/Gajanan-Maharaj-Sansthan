import { Hero } from "@/features/info/components/Hero";
import { Features } from "@/features/info/components/Features";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
    </div>
  );
}
