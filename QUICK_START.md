# QUICK START: SEO & SEM Configuration

## 🚀 5-Minute Setup

### Step 1: Add Environment Variables
In your Vercel project settings, add these variables:

```
NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID = AW-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID = XXXXXXXXXX
```

**How to find your IDs:**
- [Google Analytics](https://analytics.google.com) → Admin → Data Streams → Measurement ID
- [Google Ads](https://ads.google.com) → Tools → Conversions → Set up conversion
- [Meta Pixel](https://business.facebook.com) → Events Manager → Pixel ID

### Step 2: Verify Setup
All tracking pixels are already installed in `app/layout.tsx`. They'll activate once you add the env variables.

---

## 📋 URLs Created

| What | URL | Status |
|------|-----|--------|
| Privacy Policy | `/privacy` | ✅ Live |
| Terms of Service | `/terms` | ✅ Live |
| Risk Disclosure | `/risk-disclosure` | ✅ Live |
| FAQ | `/faq` | ✅ Live |
| Homepage | `/` | ✅ Enhanced |

---

## 🔑 Key SEO Keywords

**Target these in Google Ads:**
- "prop trading"
- "funded trading accounts"
- "instant funding forex"
- "prop firm profit split"
- "trading challenge evaluation"

---

## ✅ What's Done

- ✅ Google Analytics GA4 integration
- ✅ Google Ads conversion tracking
- ✅ Meta Pixel (Facebook Ads)
- ✅ JSON-LD structured data
- ✅ FAQ Schema rich snippets
- ✅ Enhanced meta titles & descriptions
- ✅ 35+ SEO keywords
- ✅ Policy pages (Privacy, Terms, Risk)
- ✅ robots.txt optimization
- ✅ Footer policy links
- ✅ Mobile-first responsive design
- ✅ Open Graph tags for social sharing

---

## 📊 Next Steps

1. **Submit to Google Search Console**
   - Go to search.google.com/search-console
   - Add property: https://ckcapital.co.uk
   - Verify via DNS or HTML file
   - Submit sitemap.xml

2. **Link Your Analytics**
   - GA4 will track automatically once env var is set
   - Check GA4 real-time reports in 5 minutes

3. **Setup Google Ads Campaigns**
   - Create search campaigns targeting keywords
   - Set up conversion tracking (already embedded)
   - Monitor ROAS

4. **Create Facebook Ad Campaigns**
   - Link Meta Pixel to your Business Account
   - Create retargeting audiences
   - Run conversion campaigns

---

## 📈 How to Track Success

### In Google Analytics
- Dashboard → Overview
- Look for: Sessions, Users, Conversion Rate
- Filter by traffic source

### In Google Ads
- Campaigns → Conversions
- Track: CPA (Cost Per Acquisition)
- Monitor: ROAS (Return on Ad Spend)

### In Meta Ads Manager
- Assets → Events Manager
- Check: CAPI conversion tracking
- Monitor: Pixel events firing

---

## 🐛 Troubleshooting

**Analytics not showing data?**
→ Check env variables are set correctly
→ Wait 24 hours for GA4 to process data

**Pixel not firing?**
→ Open DevTools → Network tab
→ Search for "fbq" or "gtag"
→ Ensure script is loading

**Page not indexed in Google?**
→ Submit in Search Console
→ Wait 1-2 weeks for crawling
→ Check robots.txt allows indexing

---

## 💡 Best Practices

1. **Weekly**: Check analytics for anomalies
2. **Weekly**: Review ad performance
3. **Monthly**: Audit top-performing content
4. **Monthly**: Update underperforming keywords
5. **Quarterly**: Full SEO audit

---

## 📞 Support

- **Setup Help**: Check SEO_MARKETING_SETUP.md
- **Implementation**: See SEO_COMPLETE_IMPLEMENTATION.md
- **Full Details**: Read PROJECT_COMPLETE_SUMMARY.md

---

**Ready to go live?** ✅ Deploy to Vercel and add those 3 env variables!
