// netlify/functions/mellow.js
const Parser = require('rss-parser');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const parser = new Parser();

const sources = [
  "https://www.goodgoodgood.co/articles/rss.xml",
  "https://www.goodnewsnetwork.org/feed/",
  "https://www.positive.news/feed/",
  "https://reasonstobecheerful.world/feed/",
];

const fallbackImage = 'https://moodscroll.netlify.app/assets/images/moodscroll.png';

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
  try {
    const sourceItems = await Promise.all(
      sources.map(async (url) => {
        const feed = await parser.parseURL(url);
        return await Promise.all(
          feed.items.slice(0, 10).map(async (item) => {
            const imageFromOG = await getOgImage(item.link);
            return {
              title: item.title,
              link: item.link,
              published: item.pubDate || item.isoDate || '',
              source: feed.title || '',
              image: imageFromOG || item.enclosure?.url || item['media:content']?.['$']?.url || fallbackImage,
            };
          })
        );
      })
    );

    // Interleave stories
    let interleaved = [];
    let maxLength = Math.max(...sourceItems.map(arr => arr.length));
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
  } catch (error) {
    console.error("Mellow fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch mellow stories.' }),
    };
  }
};
