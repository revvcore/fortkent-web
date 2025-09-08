import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import { currencyFormatter } from "@/lib/CurrencyFormatter";
import { generateInventorySlug } from "@/lib/GenerateInventorySlug";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SearchInventory() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      const response = await fetch(
        `https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f?search=${query}`
      );
      const data = await response.json();
      setResults(data);
      setLoading(false);
    };
    if (query.length > 2) {
      fetchInventoryItems();
    }
  }, [query]);

  return (
    <div className="relative">
      <div className="relative w-full cursor-default overflow-hidden rounded border border-slate-400 bg-white text-left shadow-sm ">
        <input
          type="text"
          value={query}
          className="focus:outline-gray-500 sm:text-sm py-2 px-3 w-full"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Inventory (e.g., '2018 KAYO Storm')"
          onFocus={() => setShowPopup(true)}
          onBlur={() => setShowPopup(false)}
        />
        <Search className="size-4 aspect-square absolute right-2 top-1/2 transform -translate-y-1/2" />
      </div>
      {showPopup && results.length > 3 && (
        <div className="absolute max-w-screen z-50 bg-white border border-slate-300 rounded shadow-lg shadow-slate-300 max-h-[60vh] overflow-auto">
          {loading ? (
            <SpinLoader />
          ) : (
            <div>
              <div className="py-2 px-4 flex justify-between items-center">
                <p>Total Results: {results.length}</p>
                <Link
                  href={`/inventory?s=${query}`}
                  className="text-sm font-semibold text-primary-500"
                  prefetch={true}
                >
                  See All Results{" "}
                  <ChevronRight className="inline-block size-4" />
                </Link>
              </div>
              {results.slice(0, 5).map((item) => {
                const vehicleName =
                  `${item.year} ${item.make} ${item.model} ${item.trim} ${item.class} ${item.conditionType} ${item?.specifications?.color?.exterior}` ||
                  "Unknown Vehicle";
                const msrp =
                  currencyFormatter.format(item?.price?.msrp) || null;
                const sale =
                  currencyFormatter.format(item?.price?.sale) || null;
                const showSavings = msrp && sale && msrp > sale;
                const saving = showSavings
                  ? currencyFormatter.format(
                      item?.price?.msrp - item?.price?.sale
                    )
                  : null;
                return (
                  <Link
                    href={`/vehicle/${generateInventorySlug(item)}`}
                    key={item._id}
                    className="flex border-t border-slate-300 bg-white hover:bg-slate-100 p-4"
                    prefetch={true}
                  >
                    <img
                      src={item.media?.imgFeatured?.url || "/no-image.webp"}
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
          )}
        </div>
      )}
    </div>
  );
}
