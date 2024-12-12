const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.8 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://sizningsaytingiz.com",
  });
  const writeStream = createWriteStream("./public/sitemap.xml");

  pages.forEach((page) => sitemap.write(page));
  sitemap.end();

  await streamToPromise(sitemap).then(() => {
    console.log("Sitemap generated successfully!");
  });
}

generateSitemap().catch((err) => console.error(err));
