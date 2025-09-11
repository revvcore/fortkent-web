const INVENTORY_URL =
  "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f";

export async function getInventory({
  cacheKey = "inventoryCache",
  ttl = 10 * 60 * 1000,
} = {}) {
  // ttl is in milliseconds, default is 10 minutes
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < ttl) {
        return data;
      }
    } catch {
      // ignore bad cache
    }
  }

  // Fetch fresh data
  const response = await fetch(INVENTORY_URL, { cache: "force-cache" });
  const data = await response.json();
  localStorage.setItem(
    cacheKey,
    JSON.stringify({ data, timestamp: Date.now() })
  );
  return data;
}
