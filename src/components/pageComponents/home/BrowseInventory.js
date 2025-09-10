"use client";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import { oemMakes } from "@/data/oemMakes";
import Link from "next/link";
import { useEffect, useState } from "react";

const INVENTORY_URL =
  "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f";

export default function BrowseInventory() {
  const [filteredMakes, setFilteredMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      try {
        const res = await fetch(INVENTORY_URL);
        const data = await res.json();
        // Get all unique makes from inventory (normalized: lowercase & trimmed)
        const inventoryMakes = [
          ...new Set(
            data.map((item) => (item.make || "").trim()?.toLowerCase())
          ),
        ];
        // Function to normalize make names for comparison
        const normalize = (make) => (make || "").trim()?.toLowerCase();
        const filteredOEMs = oemMakes.filter((oem) =>
          inventoryMakes?.includes(normalize(oem?.make))
        );
        setFilteredMakes(filteredOEMs);
      } catch (err) {
        setFilteredMakes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchInventory();
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
              ? `/promotions/${brand.make?.toLowerCase()}`
              : `/inventory?make=${brand.make?.toLowerCase()}`;
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
