# SEO Setup & Monitoring Guide

Complete guide for setting up and monitoring SEO for Shri Gajanan Maharaj Sansthan website.

---

## 📋 Table of Contents

1. [Google Search Console Setup](#google-search-console-setup)
2. [Google Analytics 4 Setup](#google-analytics-4-setup)
3. [Sitemap Submission](#sitemap-submission)
4. [Structured Data Verification](#structured-data-verification)
5. [Performance Monitoring](#performance-monitoring)
6. [Local SEO Setup](#local-seo-setup)
7. [Ongoing Optimization](#ongoing-optimization)
8. [Blog SEO Content Operations](#blog-seo-content-operations)

---

## 🔍 Google Search Console Setup

### Step 1: Verify Domain Property

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Choose "Domain" property type
4. Enter: `shrigajananmaharajsanstan.com`
5. You'll get a TXT DNS record to add to your domain provider

### Step 2: DNS Verification

1. Log in to your domain registrar (where you bought the domain)
2. Find DNS settings
3. Add the TXT record provided by Google
4. Wait 5-10 minutes and click "Verify" in Search Console

### Step 3: Submit Sitemap

Once verified:
1. In Search Console, go to "Sitemaps" in left sidebar
2. Enter sitemap URL: `https://www.shrigajananmaharajsanstan.com/sitemap.xml`
3. Click "Submit"
4. Wait 24-48 hours for Google to process

### Step 4: Set Up Email Alerts

1. Go to "Settings" → "Users and permissions"
2. Add your email if not already there
3. Enable notifications for:
   - Index coverage issues
   - Manual actions
   - Security issues
   - Mobile usability errors

---

## 📊 Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property if you don't have one
3. Name it "Shri Gajanan Maharaj Sansthan"
4. Select timezone: India (IST)
5. Select currency: INR

### Step 2: Get Measurement ID

1. In Admin → Data Streams
2. Click "Add stream" → "Web"
3. Enter website URL: `https://www.shrigajananmaharajsanstan.com`
4. Copy the Measurement ID (format: G-XXXXXXXXXX)

### Step 3: Add to Website

1. Update `.env` file:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
2. Rebuild and deploy the website

### Step 3A: Set Canonical Site URL (Recommended)

Add your production domain to `.env` so canonicals, sitemap, robots, and structured data always use the correct host:

```env
NEXT_PUBLIC_SITE_URL=https://www.shrigajananmaharajsanstan.com
```

### Step 4: Configure Events

The following events are already tracked:
- ✅ `booking_started` - When user opens booking form
- ✅ `booking_completed` - When user submits booking request
- ✅ `whatsapp_click` - WhatsApp button clicks
- ✅ `phone_click` - Phone number clicks
- ✅ `location_view` - Location page views
- ✅ `booking_cta_click` - Booking CTA button clicks

### Step 5: Set Up Conversions

Mark these as conversion events in GA4:
1. Go to Admin → Events
2. Mark as conversion:
   - `booking_completed`
   - `whatsapp_click`
   - `phone_click`

---

## 🗺️ Sitemap Submission

### Automatic Submission (Recommended)

Your sitemap is automatically generated at:
- **URL**: `https://www.shrigajananmaharajsanstan.com/sitemap.xml`
- **Robots.txt**: Already references the sitemap

### Manual Submission to Other Search Engines

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Add your site
3. Verify ownership (can import from Google Search Console)
4. Submit sitemap URL

**Yandex (Optional):**
1. Go to [Yandex Webmaster](https://webmaster.yandex.com/)
2. Add site and verify
3. Submit sitemap

---

## ✅ Structured Data Verification

### Test Structured Data

Use Google's Rich Results Test:
1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Test these pages:
   - Homepage: `https://www.shrigajananmaharajsanstan.com/`
   - Location page: `https://www.shrigajananmaharajsanstan.com/locations/shegaon-bhakt-niwas`
   - Booking page: `https://www.shrigajananmaharajsanstan.com/booking`

### Expected Results

**Homepage:**
- ✅ Organization schema
- ✅ WebSite schema

**Location Pages:**
- ✅ PlaceOfWorship schema
- ✅ LocalBusiness schema
- ✅ LodgingBusiness schema
- ✅ Breadcrumb schema

**Booking Page:**
- ✅ FAQPage schema

### Fix Issues

If any issues appear:
1. Note the specific error message
2. Check the relevant structured data file in `src/lib/seo/structured-data.ts`
3. Fix and redeploy
4. Re-test after 24 hours

---

## 📈 Performance Monitoring

### Core Web Vitals

Monitor these metrics weekly:

**LCP (Largest Contentful Paint):**
- Target: < 2.5 seconds
- Main factor: Hero image loading
- Check in: Search Console → Core Web Vitals

**CLS (Cumulative Layout Shift):**
- Target: < 0.1
- Main factor: Image dimensions, font loading
- Check in: Search Console → Core Web Vitals

**INP (Interaction to Next Paint):**
- Target: < 200ms
- Main factor: JavaScript execution
- Check in: Search Console → Core Web Vitals

### Lighthouse Audit

Run monthly Lighthouse audits:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" and "SEO"
4. Click "Generate report"
5. Target scores:
   - Performance: 90+
   - SEO: 95+
   - Accessibility: 90+
   - Best Practices: 95+

### PageSpeed Insights

Check at [PageSpeed Insights](https://pagespeed.web.dev/):
- Test both mobile and desktop
- Focus on Field Data (real user data)
- Monitor trends over time

---

## 🌍 Local SEO Setup

### Google Business Profile

**CRITICAL**: Set up Google Business Profile for each location:

**Main Location - Shegaon:**
1. Go to [Google Business Profile](https://business.google.com/)
2. Create business listing:
   - Name: "Shri Gajanan Maharaj Sansthan - Shegaon"
   - Category: "Hindu temple" + "Lodging"
   - Address: Use exact address from contact data
   - Phone: 9217691636
   - Website: https://www.shrigajananmaharajsanstan.com/locations/shegaon-bhakt-niwas
3. Add photos (minimum 10 high-quality photos)
4. Add business hours (24/7)
5. Enable messaging
6. Add attributes:
   - Wheelchair accessible
   - Free parking
   - Family-friendly
   - Accepts donations

**Repeat for other locations:**
- Pandharpur
- Trimbakeshwar
- Omkareshwar

### Citations & Directories

List your business on:
- ✅ JustDial
- ✅ Sulekha
- ✅ IndiaMART (if applicable)
- ✅ TripAdvisor
- ✅ Facebook Business Page

**Consistency is KEY**: Use exact same NAP (Name, Address, Phone) everywhere:
```
Name: Shri Gajanan Maharaj Sansthan
Address: Shri Gajanan Maharaj Temple Complex, Shegaon, Dist. Buldhana, Maharashtra - 444203
Phone: 9217691636
```

### Encourage Reviews

Ask devotees to leave reviews on:
- Google Business Profile
- Facebook
- TripAdvisor

**How to ask:**
- Add review links on confirmation messages
- Display QR codes at check-out counters
- Send follow-up WhatsApp messages

---

## 🔄 Ongoing Optimization

### Weekly Tasks

**Every Monday:**
1. Check Search Console for errors
2. Review Core Web Vitals
3. Monitor ranking changes (use free tools like Ubersuggest)

### Monthly Tasks

**First Monday of month:**
1. Run Lighthouse audit
2. Check GA4 reports:
   - User engagement
   - Conversion rates
   - Top landing pages
   - Traffic sources
3. Review and respond to Google Business Profile reviews
4. Check for broken links (use free tools like Dead Link Checker)
5. Update content if needed

### Quarterly Tasks

**Every 3 months:**
1. Comprehensive SEO audit
2. Competitor analysis
3. Keyword research update
4. Content refresh (update old pages)
5. Backlink analysis (use free tools like Ahrefs Backlink Checker)

---

## 📝 Blog SEO Content Operations

The site now includes a large markdown SEO content cluster. Use these commands before deployment:

```bash
# Regenerate deterministic blog clusters
npm run generate:blogs

# Validate slug/frontmatter/internal-link quality
npm run validate:blog

# Strict mode: fail if warnings exist
npm run validate:blog:strict

# Verify canonical/meta/schema in prerendered HTML (run after build)
npm run verify:seo-build

# Verify canonical host consistency across all SEO pages
npm run verify:canonical

# Verify sitemap coverage against posts/tags/categories
npm run verify:sitemap
```

`verify:seo-build` checks canonical/keywords/OG/JSON-LD plus required schema types and keyword-fragment coverage on critical pages.

### Validation rules enforced

- unique and valid kebab-case slugs
- required frontmatter quality checks
- required internal links to location + booking/contact + related blog pages
- known location ID references

---

## 📊 Key Metrics to Track

### Search Console Metrics

Track weekly in a spreadsheet:
- Total clicks
- Total impressions
- Average CTR (Click-Through Rate)
- Average position
- Top performing pages
- Top performing queries

### GA4 Metrics

Track monthly:
- Total users
- New users
- Sessions
- Engagement rate
- Average engagement time
- Conversion rate (booking_completed)
- Top traffic sources

### Target Goals (3-month)

- **Organic Traffic**: 1000+ monthly visitors
- **Booking Conversions**: 50+ monthly booking requests
- **Average Position**: Top 10 for primary keywords
- **CTR**: 5%+ average
- **Core Web Vitals**: All green

---

## 🚀 Quick Wins for Immediate Impact

### Week 1: Foundation
- ✅ Submit sitemap to Search Console ← **DO THIS FIRST**
- ✅ Verify all structured data
- ✅ Set up Google Business Profile for Shegaon

### Week 2: Local SEO
- ✅ Create profiles for other locations
- ✅ Add 10+ photos to each location
- ✅ List on JustDial and Sulekha

### Week 3-4: Content & Links
- ✅ Ask first devotees for reviews
- ✅ Monitor initial rankings
- ✅ Fix any issues in Search Console

---

## 🆘 Troubleshooting

### "Pages aren't indexed"

**Solution:**
1. Check `robots.txt` - should allow crawling
2. Check Search Console → Coverage report
3. Request indexing manually for important pages
4. Wait 2-3 weeks for Google to crawl

### "No impressions in Search Console"

**Solution:**
1. Ensure sitemap is submitted
2. Check if site is live and accessible
3. Verify Google Analytics is working
4. Wait 7-10 days for data to appear

### "Structured data errors"

**Solution:**
1. Use Rich Results Test tool
2. Check error message details
3. Fix in `src/lib/seo/structured-data.ts`
4. Redeploy website
5. Test again

---

## 📞 Support Resources

- **Search Console Help**: https://support.google.com/webmasters
- **GA4 Help**: https://support.google.com/analytics
- **Schema.org**: https://schema.org/
- **Web.dev**: https://web.dev/ (Performance tips)

---

## ✅ SEO Implementation Checklist

Copy this checklist and track your progress:

### Technical SEO
- [x] Sitemap generated and submitted
- [x] Robots.txt configured
- [x] Structured data implemented
- [x] Canonical URLs added
- [x] Image optimization enabled
- [x] Core Web Vitals optimized

### On-Page SEO
- [x] Page-specific metadata on all pages
- [x] Proper heading hierarchy (H1 → H2 → H3)
- [x] Descriptive alt texts for images
- [x] Internal linking structure
- [x] FAQ schema implemented

### Analytics & Tracking
- [ ] Google Search Console verified ← **ACTION REQUIRED**
- [ ] Sitemap submitted to Search Console ← **ACTION REQUIRED**
- [ ] Google Analytics 4 configured ← **ADD GA4 ID TO .env**
- [ ] Conversion tracking set up
- [ ] Email alerts enabled

### Local SEO
- [ ] Google Business Profile created ← **ACTION REQUIRED**
- [ ] All locations listed
- [ ] Photos added to profiles
- [ ] Citations on directories
- [ ] NAP consistency verified

### Content & Engagement
- [x] FAQ page created
- [ ] Initial reviews collected
- [ ] Social media linked
- [ ] Blog/news section (optional)

---

## 🎯 Expected Timeline & Results

**Week 1-2: Indexing**
- Website gets indexed by Google
- Basic data starts appearing in Search Console

**Week 3-4: Initial Rankings**
- Site appears for brand name searches
- Long-tail keywords start ranking
- First organic visitors arrive

**Month 2: Growing Visibility**
- Ranking improves for location-based keywords
- Google Business Profile starts showing in local searches
- Consistent organic traffic growth

**Month 3: Established Presence**
- Top 10 rankings for several target keywords
- Regular booking requests from organic search
- Positive review accumulation

**Month 6+: Market Leader**
- Top 3 rankings for primary keywords
- Dominant local search presence
- Steady stream of organic booking requests

---

## 📝 Notes

- Update this document as you complete tasks
- Track metrics in a spreadsheet
- Review and update SEO strategy quarterly
- Stay updated with Google algorithm changes
- For rollout evidence and technical validation output, see `docs/SEO_ROLLOUT_VERIFICATION_REPORT.md`
- Use `docs/SEO_WEEKLY_TRACKER_TEMPLATE.md` for weekly KPI tracking

---

**Last Updated**: 2026-02-05
**Next Review**: 2026-05-05
