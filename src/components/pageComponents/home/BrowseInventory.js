"use client";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import { oemMakes } from "@/data/oemMakes";
import normalize from "@/lib/normalize";
import Link from "next/link";
import { useEffect, useState } from "react";

const INVENTORY_URL =
  "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f";
const CACHE_KEY = "browseMakesCache";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function loadCachedMakes() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached || !cached.data || !cached.timestamp) return null;
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.data;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function saveCachedMakes(data) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );
}

export default function BrowseInventory() {
  const [filteredMakes, setFilteredMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function getMakes() {
      setLoading(true);
      // Try cache first
      const cached = loadCachedMakes();
      if (cached) {
        setFilteredMakes(cached);
        setLoading(false);
        return;
      }
      // Fetch inventory and filter makes
      try {
        const res = await fetch(INVENTORY_URL, { cache: "force-cache" });
        const data = await res.json();
        const inventoryMakes = new Set(
          data.map((item) => normalize(item.make))
        );
        const filteredOEMs = oemMakes.filter((oem) =>
          inventoryMakes.has(normalize(oem.make))
        );
        if (isMounted) {
          setFilteredMakes(filteredOEMs);
          saveCachedMakes(filteredOEMs);
        }
      } catch {
        if (isMounted) setFilteredMakes([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    getMakes();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-center mb-8">Browse Inventory by Make</h2>
      {loading ? (
        <SpinLoader className="mx-auto" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto items-center">
          {filteredMakes.map((brand) => {
            const redirectUrl = brand.isOem
              ? `/promotions/${normalize(brand.make)}`
              : `/inventory?make=${normalize(brand.make)}`;
            return (
              <Link
                href={redirectUrl}
                key={brand.make}
                className="flex flex-col items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.make}
                  title={brand.make}
                  className="max-h-16 md:max-h-20 object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-300"
                  style={{ maxWidth: "180px", width: "100%" }}
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
