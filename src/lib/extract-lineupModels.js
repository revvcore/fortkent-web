// Node.js script to extract all lineup-model items from the WordPress XML and output to JSON
const fs = require("fs");
const { XMLParser } = require("fast-xml-parser");

const xml = fs.readFileSync("./public/files/lineupModels.xml", "utf8");
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  processEntities: true,
});
const json = parser.parse(xml);

const items = json.rss.channel.item || [];

function getCategoryObj(categories) {
  let make = null,
    lineupModel = null;
  if (!categories) return { make, lineupModel };
  if (!Array.isArray(categories)) categories = [categories];
  for (const cat of categories) {
    if (cat.domain === "make") make = cat["#text"] || cat;
    if (cat.domain === "lineupmodel" || cat.domain === "lineup-model")
      lineupModel = cat["#text"] || cat;
  }
  return { make, lineupModel };
}

const result = items
  .filter((item) => item["wp:post_type"] === "lineup-model")
  .map((item) => {
    // Try to extract image URL from post meta or enclosure
    let imageUrl = "";
    if (item["wp:postmeta"]) {
      const postmeta = Array.isArray(item["wp:postmeta"])
        ? item["wp:postmeta"]
        : [item["wp:postmeta"]];
      const imageMeta = postmeta.find(
        (meta) =>
          meta["wp:meta_key"] === "_thumbnail_id" ||
          meta["wp:meta_key"] === "_wp_attached_file"
      );
      if (imageMeta && imageMeta["wp:meta_value"]) {
        // If you have the uploads base URL, prepend it here
        imageUrl = imageMeta["wp:meta_value"];
      }
    }
    // Fallback: check enclosure
    if (!imageUrl && item.enclosure && item.enclosure.url) {
      imageUrl = item.enclosure.url;
    }
    // Fallback: check attachment_url
    if (!imageUrl && item["wp:attachment_url"]) {
      imageUrl = item["wp:attachment_url"];
    }

    return {
      title: item.title || "",
      content: (item["content:encoded"] || "").replace(/\r?\n|\t/g, "").trim(),
      postid: item["wp:post_id"] || "",
      slug: item["wp:post_name"] || "",
      image: imageUrl,
      make: getCategoryObj(item.category).make,
      lineupModel: getCategoryObj(item.category).lineupModel,
    };
  });

fs.writeFileSync(
  "./src/data/lineupModels.json",
  JSON.stringify(result, null, 2)
);
console.log(`Extracted ${result.length} lineup-model items.`);
