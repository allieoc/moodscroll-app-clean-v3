import Parser from 'rss-parser';

const parser = new Parser();

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

export async function handler() {
  try {
    const allItems = [];

    for (const url of sources) {
      const feed = await parser.parseURL(url);
      const items = feed.items
        .filter(item => item.title && item.link && item.contentSnippet)
        .map(item => ({
          title: item.title,
          link: item.link,
          summary: item.contentSnippet,
          source: feed.title,
          pubDate: item.pubDate,
          image: item.enclosure?.url || null
        }));
      allItems.push(...items);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(allItems)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
