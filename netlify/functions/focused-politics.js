// Example: focused-politics.js
import { fallbackImage } from '@/assets/images/moodscroll.png';

const Parser = require("rss-parser");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const parser = new Parser();

const sources = [
  "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
  "http://rss.cnn.com/rss/cnn_allpolitics.rss",
  "https://rss.politico.com/politics-news.xml",
  "https://www.thenation.com/subject/politics/feed/",
  "https://www.cbsnews.com/latest/rss/politics",
  "https://feeds.content.dowjones.io/public/rss/socialpoliticsfeed"
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
            image: 
                image || 
                item.enclosure?.url || 
                item["media:content"]?.["$"]?.url || 
                fallbackImage
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
