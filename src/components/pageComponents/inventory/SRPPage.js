"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import SRPInventory from "./SRPInventory";
import Filters from "./Filters";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import { useDevice } from "@/lib/useDevice";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";
import { Filter, X } from "lucide-react";

const SRPPageContent = ({ make }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { IsTab, IsMob } = useDevice();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("p")) || 1;
  const itemsPerPage = 12;
  const sort = searchParams.get("sort") || "latest";
  const searchParam = searchParams.get("s") || "";

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
        `https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f?search=${
          searchParam || ""
        }&make=${make || ""}`
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
      result = result.filter((i) => i?.price?.msrp >= Number(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((i) => i?.price?.msrp <= Number(filters.maxPrice));

    // sorting
    result = [...result];
    switch (sort) {
      case "priceHigh":
        result.sort((a, b) => (b?.price?.msrp || 0) - (a?.price?.msrp || 0));
        break;
      case "priceLow":
        result.sort((a, b) => (a?.price?.msrp || 0) - (b?.price?.msrp || 0));
        break;
      case "yearLatest":
        result.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "yearOld":
        result.sort((a, b) => (a.year || 0) - (b.year || 0));
        break;
      case "latest":
      default:
        // Assuming latest means by _id or created order, fallback to no sort
        break;
    }
    return result;
  }, [filters, inventoryItems, sort]);

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
      color: cleanOptions(
        inventoryItems.map((i) => i?.specifications?.color?.exterior)
      ),
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
    <div className="w-full bg-white relative">
      <div className="section-container py-12 flex md:flex-row flex-col items-start gap-6 relative">
        {/* Sidebar filters */}
        {IsTab || IsMob ? (
          <>
            <div className="relative">
              <StyledButton
                className="fixed w-fit right-4 bottom-6 z-50"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </StyledButton>
            </div>
            {/* Slide-over menu for filters */}
            {showFilters && (
              <div className="fixed inset-0 z-50 flex">
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black/30"
                  onClick={() => setShowFilters(false)}
                />
                {/* Drawer */}
                <div className="relative bg-slate-50 w-80 max-w-full h-full max-h-screen overflow-auto shadow-lg animate-slide-in-right">
                  <button
                    className="text-red-500 size-6 aspect-square absolute top-4 right-4"
                    onClick={() => setShowFilters(false)}
                    aria-label="Close"
                  >
                    <X />
                  </button>
                  <Filters
                    options={dynamicOptions}
                    closeModal={() => setShowFilters(false)}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full md:w-1/3 self-start">
            <Filters options={dynamicOptions} />
          </div>
        )}

        <SRPInventory
          items={paginatedItems}
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          loading={loading}
          sort={sort}
        />
      </div>
    </div>
  );
};
export default function SRPPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <SRPPageContent />
    </Suspense>
  );
}
