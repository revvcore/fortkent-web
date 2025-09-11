"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Default TTL (e.g. 10 minutes)
const DEFAULT_TTL = 10 * 60 * 1000;
// Cache key for localStorage
const CACHE_KEY = "inventoryCache";

const InventoryContext = createContext();

export function InventoryProvider({ children, cacheTtl }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Use provided TTL or default
  const ttl = typeof cacheTtl === "number" ? cacheTtl : DEFAULT_TTL;

  useEffect(() => {
    let ignore = false;

    async function fetchInventory() {
      setLoading(true);
      try {
        // Check localStorage for cached data
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < ttl) {
            setInventory(data);
            setLoading(false);
            return;
          }
        }

        // // Build API URL with query params if present
        // let baseUrl =
        //   process.env.NEXT_PUBLIC_INVENTORY_URL ||
        //   "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f";
        // let url = baseUrl;
        // if (typeof window !== "undefined") {
        //   const params = new URLSearchParams(window.location.search);
        //   // Only use params that are present (not empty)
        //   const filteredParams = Array.from(params.entries()).filter(
        //     ([k, v]) => v && v.trim() !== ""
        //   );
        //   if (filteredParams.length > 0) {
        //     url =
        //       baseUrl + "?" + new URLSearchParams(filteredParams).toString();
        //   }
        // }

        const res = await fetch(
          process.env.NEXT_PUBLIC_INVENTORY_URL ||
            "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f"
        );
        const data = await res.json();
        // Save to cache
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data, timestamp: Date.now() })
        );
        if (!ignore) setInventory(data);
      } catch (e) {
        if (!ignore) setError(e);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchInventory();
    return () => {
      ignore = true;
    };
  }, [ttl]);

  return (
    <InventoryContext.Provider value={{ inventory, loading, error }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
