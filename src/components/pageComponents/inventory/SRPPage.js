"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import SRPInventory from "./SRPInventory";
import Filters from "./Filters";

export default function SRPPage() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("p")) || 1;
  const itemsPerPage = 12;

  // ✅ parse filters from URL only (Filters component keeps them in sync)
  const filters = {
    make: searchParams.get("make") || "",
    year: searchParams.get("year") || "",
    model: searchParams.get("model") || "",
    trim: searchParams.get("trim") || "",
    condition: searchParams.get("condition") || "",
    color: searchParams.get("color") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      const response = await fetch(
        "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f"
      );
      const data = await response.json();
      setInventoryItems(data);
      setLoading(false);
    };

    fetchInventoryItems();
  }, []);

  // ✅ filter logic
  const filteredItems = useMemo(() => {
    let result = inventoryItems;

    if (filters.make) result = result.filter((i) => i.make === filters.make);
    if (filters.year)
      result = result.filter((i) => String(i.year) === filters.year);
    if (filters.model) result = result.filter((i) => i.model === filters.model);
    if (filters.trim) result = result.filter((i) => i.trim === filters.trim);
    if (filters.condition)
      result = result.filter((i) => i.condition === filters.condition);
    if (filters.color)
      result = result.filter((i) => i?.color?.exterior === filters.color);
    if (filters.type) result = result.filter((i) => i.type === filters.type);

    if (filters.minPrice)
      result = result.filter((i) => i.price >= Number(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((i) => i.price <= Number(filters.maxPrice));

    return result;
  }, [filters, inventoryItems]);

  // ✅ options cleaner
  const cleanOptions = (arr, isYear = false) => {
    const values = [...new Set(arr)].filter(Boolean);
    return isYear
      ? values.sort((a, b) => Number(b) - Number(a))
      : values.sort();
  };

  const dynamicOptions = useMemo(
    () => ({
      make: cleanOptions(inventoryItems.map((i) => i.make)),
      year: cleanOptions(
        inventoryItems.map((i) => i.year),
        true
      ),
      model: cleanOptions(inventoryItems.map((i) => i.model)),
      trim: cleanOptions(inventoryItems.map((i) => i.trim)),
      condition: cleanOptions(inventoryItems.map((i) => i.conditionType)),
      color: cleanOptions(inventoryItems.map((i) => i?.specifications?.color?.exterior)),
      type: cleanOptions(inventoryItems.map((i) => i.bodyType)),
    }),
    [inventoryItems]
  );

  // ✅ paginate after filter
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-white">
      <div className="section-container py-12 flex flex-row items-start gap-6">
        {/* Sidebar filters */}
        <div className="w-1/3 py-6 sticky top-24 self-start">
          <Filters options={dynamicOptions} />
        </div>

        {/* Inventory list */}
        <SRPInventory
          items={paginatedItems}
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          loading={loading}
        />
      </div>
    </div>
  );
}
