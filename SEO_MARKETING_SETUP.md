# SEO & Marketing Configuration Guide

## Environment Variables Required

Add these to your `.env.local` or Vercel project settings:

```env
# Google Analytics (GA4)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
GOOGLE_ADS_CONVERSION_ID=XXXXXXXXXX
GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXXX

# Meta Pixel (Facebook Ads)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXX

# Google Search Console
GOOGLE_SEARCH_CONSOLE_ID=XXXXXXXXXX
```

## How to Get Your IDs

### Google Analytics (GA4)
1. Go to [Google Analytics](https://analytics.google.com)
2. Create/Select your property
3. In Admin → Data Streams → Select Web → Copy the Measurement ID (starts with G-)
4. Add to `NEXT_PUBLIC_GA_ID`

### Google Ads Conversion Tracking
1. Go to [Google Ads](https://ads.google.com)
2. In Tools → Conversions → Create conversion
3. Select "Website" as conversion source
4. Get your Conversion ID and Label
5. Add tracking code to your conversion pages (checkout, signup)

### Meta Pixel
1. Go to [Meta Business Suite](https://business.facebook.com)
2. Go to Events Manager → Data Sources → Web
3. Set up your pixel
4. Copy the Pixel ID
5. Add to `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`

## Tracking Events

### Google Ads Conversion Event
```javascript
// Track conversions
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXXX/XXXXXXXXX',
  'transaction_id': '12345'
});
```

### Meta Pixel Events
```javascript
// Track purchase
fbq('track', 'Purchase', {
  value: 99.00,
  currency: 'GBP'
});

// Track lead
fbq('track', 'Lead');

// Track view content
fbq('track', 'ViewContent', {
  content_name: 'Challenge Account',
  value: 99.00,
  currency: 'GBP'
});
```

## SEO Best Practices

### Keywords Optimized
- Primary: "prop trading", "funded trading", "prop firm"
- Secondary: "forex trading", "crypto trading", "trading firm"
- Long-tail: "instant funded trading accounts", "prop trading with profit splits", "risk-free trading challenge"

### Meta Tags
- Title: Includes primary keyword + benefit
- Description: 155-160 characters with primary keyword
- Keywords: 30+ relevant variations for search intent

### Structured Data Included
- Organization Schema: Business info, contact details
- Service Schema: Trading account offerings
- FAQ Schema: Common questions and answers
- Breadcrumb Schema (if applicable)

### Page Speed Optimization
- DNS prefetch for external domains
- Async Google Analytics loading
- Optimized image delivery
- Lazy loading components

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: https://ckcapital.co.uk
3. Verify ownership (DNS or HTML file)
4. Submit sitemap.xml
5. Monitor indexing status

## Robots.txt & Sitemap

Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://ckcapital.co.uk/sitemap.xml
```

## Content Optimization

### Page Content
- Hero: Include primary keywords naturally
- Features: 2-3 keywords per section
- FAQ: Address user search queries
- CTA: Clear value proposition

### Link Strategy
- Internal: Link between related pages
- External: Get backlinks from trading blogs
- Anchor text: Use keyword variations naturally

## Monitoring & Analytics

Track these KPIs:
- Organic traffic growth
- Conversion rate by source
- Average position in search results
- Click-through rate (CTR)
- Cost per conversion (CPC/CPL)

## Compliance & Disclaimers

✓ Financial disclaimer on all trading-related pages
✓ Risk disclosure prominently displayed
✓ Terms of service linked in footer
✓ Privacy policy for user data
✓ GDPR compliant for EU users
✓ FCA/Regulatory notices as applicable
