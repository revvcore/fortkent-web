import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import { useInventory } from "@/context/InventoryContext";
import { currencyFormatter } from "@/lib/CurrencyFormatter";
import { generateInventorySlug } from "@/lib/GenerateInventorySlug";
import Fuse from "fuse.js";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";

// Debounce hook for efficient local search
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function SearchInventory() {
  const { inventory, loading } = useInventory();
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // Click-away handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    }
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

  // Memoize Fuse instance for performance
  // Enhance inventory with a combined string for better multi-word search
  const enhancedInventory = useMemo(() => {
    if (!Array.isArray(inventory)) return [];
    return inventory.map((item) => ({
      ...item,
      _search: [
        item.year,
        item.make,
        item.model,
        item.trim,
        item.class,
        item.conditionType,
        item?.specifications?.color?.exterior,
        item.vin,
        item.stockNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    }));
  }, [inventory]);

  const fuse = useMemo(() => {
    if (!Array.isArray(enhancedInventory)) return null;
    return new Fuse(enhancedInventory, {
      shouldSort: true,
      includeScore: true,
      threshold: 0.55, // fuzzier
      matchAllTokens: true,
      keys: [
        "_search",
        "year",
        "make",
        "model",
        "trim",
        "class",
        "conditionType",
        "specifications.color.exterior",
        "vin",
        "stockNumber",
      ],
    });
  }, [enhancedInventory]);

  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2 || !fuse) return [];
    return fuse.search(debouncedQuery.toLowerCase()).map((res) => res.item);
  }, [debouncedQuery, fuse]);
  // Show popup on focus if input has any value
  const handleFocus = () => setShowPopup(true);
  // Prevent popup from closing on dropdown click
  const handleDropdownMouseDown = (e) => e.preventDefault();
  const shouldShowPopup =
    showPopup && (loading || results.length > 0 || query.length > 2);
  // Handle Enter key to navigate to inventory page with search param
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      window.location.href = `/inventory?s=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative w-full cursor-default overflow-hidden rounded border border-slate-400 bg-white text-left shadow-sm ">
        <input
          type="text"
          value={query}
          className="focus:outline-gray-500 sm:text-sm py-2 px-3 w-full"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Inventory (e.g., '2018 KAYO Storm')"
          onFocus={handleFocus}
          autoComplete="off"
          onKeyDown={handleKeyDown}
        />
        <Search className="size-4 aspect-square absolute right-2 top-1/2 transform -translate-y-1/2" />
      </div>
      <div
        className={`
          absolute max-w-screen z-50 bg-white border border-slate-300 rounded shadow-lg shadow-slate-300
          max-h-[60vh] overflow-auto
          transition-all duration-200
          ${
            shouldShowPopup
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
        style={{ minWidth: "100%" }}
        onMouseDown={handleDropdownMouseDown}
      >
        {shouldShowPopup &&
          (loading ? (
            <div className="flex w-full justify-center items-center py-6">
              <SpinLoader />
            </div>
          ) : results.length === 0 ? (
            <div className="py-6 px-4 text-center text-gray-500">
              No inventory available for your search.
            </div>
          ) : (
            <div>
              <div className="py-2 px-4 flex justify-between items-center">
                <p>Total Results: {results.length}</p>
                <Link
                  href={`/inventory?s=${encodeURIComponent(query.trim())}`}
                  className="text-sm font-semibold text-primary-500"
                  prefetch={true}
                >
                  See All Results{" "}
                  <ChevronRight className="inline-block size-4" />
                </Link>
              </div>
              {results.slice(0, 5).map((item) => {
                const vehicleName =
                  `${item.year} ${item.make} ${item.model} ${item.trim} ${item.class} ${item.conditionType} ${item?.specifications?.color?.exterior}`.trim() ||
                  "Unknown Vehicle";
                const msrp =
                  currencyFormatter.format(item?.price?.msrp) || null;
                const sale =
                  currencyFormatter.format(item?.price?.sale) || null;
                return (
                  <Link
                    href={`/vehicle/${generateInventorySlug(item)}`}
                    key={item._id}
                    className="flex border-t border-slate-300 bg-white hover:bg-slate-100 p-4"
                    prefetch={true}
                  >
                    <img
                      src={
                        item.media?.imgFeatured?.url || "/images/no-image.webp"
                      }
                      alt=""
                      className="w-16 aspect-square object-cover mr-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{vehicleName}</p>
                      <p>
                        <span
                          className={`text-sm text-gray-500 ${
                            sale ? "line-through" : ""
                          }`}
                        >
                          {msrp}
                        </span>
                        {sale && (
                          <span className="text-primary-500 ml-1">{sale}</span>
                        )}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
