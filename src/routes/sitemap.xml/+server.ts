import { getPurityTestEntries } from '$lib/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
    const tests = await getPurityTestEntries();
    const latest = tests.reduce<Date | undefined>(
        (max, { lastModified }) => (!max || lastModified > max ? lastModified : max),
        undefined
    );

    const pages: { path: string; lastModified?: Date }[] = [
        { path: '/', lastModified: latest },
        { path: '/new' },
        ...tests.map(({ testId, lastModified }) => ({ path: `/${testId}`, lastModified })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(({ path, lastModified }) => {
        const lastmod = lastModified ? `<lastmod>${lastModified.toISOString()}</lastmod>` : '';
        return `    <url><loc>${url.origin}${path}</loc>${lastmod}</url>`;
    })
    .join('\n')}
</urlset>
`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
        },
    });
};
