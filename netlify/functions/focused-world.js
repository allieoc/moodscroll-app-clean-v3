// netlify/functions/focused-world.js
//import { fallbackImage } from '@/public/moodscroll.png';
const Parser = require('rss-parser');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const parser = new Parser();

const sources = [
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  "https://www.aljazeera.com/xml/rss/all.xml",
  "https://www.cbsnews.com/latest/rss/world",
  "https://feeds.content.dowjones.io/public/rss/RSSWorldNews"
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
  const sourceItems = await Promise.all(
    sources.map(async (url) => {
      try {
        const feed = await parser.parseURL(url);
        const items = await Promise.all(
          feed.items.slice(0, 3).map(async (item) => {
            const imageFromOG = await getOgImage(item.link);
            return {
              title: item.title,
              link: item.link,
              published: item.published,
              source: feed.title,
              image:
                imageFromOG ||
                item.enclosure?.url ||
                item['media:content']?.['$']?.url ||
                null
            };
          })
        );
        return items;
      } catch (err) {
        console.error(`Failed to parse ${url}:`, err.message);
        return [];
      }
    })
  );

  // Interleave stories
  let interleaved = [];
  let maxLength = Math.max(...sourceItems.map((arr) => arr.length));
  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j < sourceItems.length; j++) {
      if (sourceItems[j][i]) interleaved.push(sourceItems[j][i]);
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(interleaved),
  };
};
