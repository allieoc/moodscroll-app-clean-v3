
const Parser = require('rss-parser');
const parser = new Parser();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const sources = [
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://www.pbs.org/newshour/feeds/rss/headlines",
  "https://abcnews.go.com/abcnews/topstories",
  "https://www.aljazeera.com/xml/rss/all.xml",
  "https://www.vox.com/rss/index.xml",
  "https://www.cbsnews.com/latest/rss/main",
  "https://abcnews.go.com/abcnews/usheadlines",
  "https://feeds.content.dowjones.io/public/rss/RSSUSnews"
];

async function getOgImage(url) {
  try {
    const res = await fetch(url, { timeout: 7000 });
    const html = await res.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');
    return ogImage || null;
  } catch (err) {
    return null;
  }
}

exports.handler = async function () {
  let allItems = [];

  for (const url of sources) {
    try {
      const feed = await parser.parseURL(url);
      const items = feed.items.slice(0, 3); // Limit per source

      for (const item of items) {
        const imageFromOG = await getOgImage(item.link);
        allItems.push({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: feed.title,
          image: imageFromOG || item.enclosure?.url || item['media:content']?.['$']?.url || null
        });
      }
    } catch (err) {
      console.error(`Failed to parse ${url}:`, err.message);
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(allItems)
  };
};
