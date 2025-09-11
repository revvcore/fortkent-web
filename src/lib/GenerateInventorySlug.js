export function generateInventorySlug(item) {
  return [
    item.year,
    item.make,
    item.model,
    item.trim,
    item?.class,
    item.conditionType,
    item?.specifications?.color?.exterior,
    item.stockNumber,
  ]
    .filter(Boolean) // remove null/undefined
    .join("-") // join with dashes
    .toLowerCase()
    .replace(/\s+/g, "-") // replace spaces
    .replace(/[^a-z0-9\-]/g, "") // clean special chars
    .replace(/\s*-\s*/g, "-") // normalize spaces around dashes to single dash
    .replace(/-+/g, "-") // collapse multiple dashes
    .replace(/^-|-$/g, ""); // trim leading/trailing dashes
}
