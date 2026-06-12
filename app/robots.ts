import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/private',
          '/*.json$',
          '/*?*sort=',
          '/*?*filter=',
        ],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: 'https://ckcapital.co.uk/sitemap.xml',
    host: 'https://ckcapital.co.uk',
  }
}
