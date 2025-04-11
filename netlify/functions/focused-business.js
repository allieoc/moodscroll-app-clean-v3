const Parser = require('rss-parser');
import { fallbackImage } from '@/assets/images/moodscroll.png';
const parser = new Parser();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const sources = [
    "https://feeds.feedburner.com/TechCrunch/",
    "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
    "https://www.wired.com/feed/rss",
    "https://www.cbsnews.com/latest/rss/technology",
    "https://www.cbsnews.com/latest/rss/moneywatch",
    "https://feeds.content.dowjones.io/public/rss/WSJcomUSBusiness",
    "https://feeds.content.dowjones.io/public/rss/RSSWSJD"
];

async function getOgImage(url) {
  try {
    const res = await fetch(url, { timeout: 7000 });
    const html = await res.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr("content");
    return ogImage || null;
  } catch (err) {
    return null;
  }
}

exports.handler = async function () {
  try {
    let sourceItems = await Promise.all(
      sources.map(async (url) => {
        const feed = await parser.parseURL(url);
        return feed.items.slice(0, 3).map(async (item) => {
          const image = await getOgImage(item.link);
          return {
            title: item.title,
            link: item.link,
            published: item.published,
            source: feed.title,
            image: image || item.enclosure?.url || item["media:content"]?.["$"]?.url || fallbackImage,
          };
        });
      })
    );

    // Wait for all inner promises
    sourceItems = await Promise.all(sourceItems.map(Promise.all.bind(Promise)));

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
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(interleaved)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
