const Parser = require('rss-parser');
const parser = new Parser();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const sources = [
  "https://www.reddit.com/r/news/.rss",
  "https://www.reddit.com/r/worldnews/.rss",
];

const fallbackImage = "https://www.logo.wine/a/logo/Reddit/Reddit-Logomark-Color-Logo.wine.svg"; // Reddit wordmark

async function getOgImage(url) {
    try {
      const res = await fetch(url, {
        timeout: 7000,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110 Safari/537.36',
        },
      });
      const html = await res.text();
      const $ = cheerio.load(html);
  
      const ogImage = $('meta[property="og:image"]').attr('content');
      const previewImg = $('img[src*="preview.redd.it"]').attr('src');
      
  
      return ogImage || previewImg || fallbackImage;
    } catch (err) {
      console.error(`Failed to fetch OG image from ${url}:`, err.message);
      return null;
    }
  }

exports.handler = async function () {
  let allItems = [];

  for (const url of sources) {
    try {
      const feed = await parser.parseURL(url);
      const items = feed.items.slice(0, 4); // Grab top 4 per subreddit

      for (const item of items) {
        const image = await getOgImage(item.link);
        allItems.push({
          title: item.title,
          link: item.link,
          published: item.published,
          source: "Reddit",
          image: image || fallbackImage,
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
    body: JSON.stringify(allItems),
  };
};
