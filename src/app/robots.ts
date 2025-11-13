import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://usvtechhub.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/usv-market/contribution/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
