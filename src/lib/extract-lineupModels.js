// Node.js script to extract all lineup-model items from the WordPress XML and output to JSON
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const xml = fs.readFileSync('./public/files/lineupModels.xml', 'utf8');
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', processEntities: true });
const json = parser.parse(xml);

const items = json.rss.channel.item || [];

function getCategoryObj(categories) {
  let make = null, lineupModel = null;
  if (!categories) return { make, lineupModel };
  if (!Array.isArray(categories)) categories = [categories];
  for (const cat of categories) {
    if (cat.domain === 'make') make = cat['#text'] || cat;
    if (cat.domain === 'lineupmodel' || cat.domain === 'lineup-model') lineupModel = cat['#text'] || cat;
  }
  return { make, lineupModel };
}

const result = items
  .filter(item => item['wp:post_type'] === 'lineup-model')
  .map(item => ({
    title: item.title || '',
    content: (item['content:encoded'] || '').replace(/\r?\n|\t/g, '').trim(),
    postid: item['wp:post_id'] || '',
    slug: item['wp:post_name'] || '',
    category: getCategoryObj(item.category)
  }));

fs.writeFileSync('./src/data/lineupModels.json', JSON.stringify(result, null, 2));
console.log(`Extracted ${result.length} lineup-model items.`);
