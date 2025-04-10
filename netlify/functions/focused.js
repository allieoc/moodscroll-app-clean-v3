const Parser = require('rss-parser');
const parser = new Parser();

exports.handler = async function () {
  try {
    const feed = await parser.parseURL('https://feeds.npr.org/1001/rss.xml');
    const stories = feed.items.slice(0, 10).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      source: 'NPR',
      description: item.contentSnippet || '',
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(stories),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch RSS feed' }),
    };
  }
};
