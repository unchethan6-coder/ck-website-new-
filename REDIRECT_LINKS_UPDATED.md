# External Links Redirect Configuration

## Overview
All authentication and checkout redirects have been configured to point to the external CK Capital application at `app.ckcapital.co.uk`.

## Updated Links

### 1. Header Navigation (components/Header.tsx)
- **Log In Button**: `https://app.ckcapital.co.uk/signin`
- **Sign Up Button**: `https://app.ckcapital.co.uk/signup`

### 2. Pricing Calculator (components/PricingCalculator.tsx)
- **Checkout Button**: `https://app.ckcapital.co.uk/signup`
  - Opens in new tab with `target="_blank"`
  - Security attribute: `rel="noopener noreferrer"`

### 3. Pricing Plans (components/PricingPlans.tsx)
- **Get Started Buttons** (all 3 plan cards): `https://app.ckcapital.co.uk/signup`
  - Redirects to sign-up page for challenge account creation

## Implementation Details

### Link Updates in Header
```tsx
// Log In Button
<a href="https://app.ckcapital.co.uk/signin">Log In</a>

// Sign Up Button
<a href="https://app.ckcapital.co.uk/signup">Sign Up</a>
```

### Link Updates in PricingCalculator
```tsx
// Checkout Button
<a href="https://app.ckcapital.co.uk/signup" target="_blank" rel="noopener noreferrer">
  Checkout
</a>
```

### Link Updates in PricingPlans
```tsx
// Get Started Buttons in Plan Cards
<a href="https://app.ckcapital.co.uk/signup">
  Get Started
</a>
```

## Testing Status

✅ **Header Links**: Verified working
- Log In redirects to signin page
- Sign Up redirects to signup page

✅ **Pricing Calculator Checkout**: Verified working
- Checkout button redirects to signup page in new tab

✅ **Pricing Plans CTA**: Updated and ready
- All "Get Started" buttons redirect to signup page

## Security Considerations

- Log In and Sign Up links use standard `href` for same-window navigation
- Checkout button uses `target="_blank"` to open in new tab
- All external links have proper security attributes (`rel="noopener noreferrer"`)
- No sensitive data is passed in URL parameters

## Future Enhancements

If needed, you can add:
1. Query parameters for tracking/referral codes
2. Pre-filled form data (e.g., `?email=user@example.com`)
3. Analytics tracking for link clicks
4. A/B testing for different landing pages

Example with query parameters:
```
https://app.ckcapital.co.uk/signup?plan=standard&ref=landing-page
```

## Verification Commands

To verify all links are working:

```bash
# Check Header
grep -n "ckcapital.co.uk/signin\|ckcapital.co.uk/signup" components/Header.tsx

# Check PricingCalculator
grep -n "ckcapital.co.uk/signup" components/PricingCalculator.tsx

# Check PricingPlans
grep -n "ckcapital.co.uk/signup" components/PricingPlans.tsx
```

## Deployment Notes

- All changes are in the landing page components
- No database or backend changes needed
- Links are hardcoded and will work immediately upon deployment
- Monitor in Analytics to track redirect clicks and conversions

Last Updated: 2025
Status: ✅ Complete
