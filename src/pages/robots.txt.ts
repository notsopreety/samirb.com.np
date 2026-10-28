import type { APIRoute } from "astro";
import { SITE_URL } from "../config/portfolioData";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site || SITE_URL);
  return new Response(getRobotsTxt(sitemapURL));
};
