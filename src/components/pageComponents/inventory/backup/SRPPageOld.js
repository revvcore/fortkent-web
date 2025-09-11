"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense, useState } from "react";
import SRPInventory from "../SRPInventory";
import Filters from "../Filters";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import { useDevice } from "@/lib/useDevice";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";
import { Filter, X } from "lucide-react";
import normalize from "@/lib/normalize";
import { useInventory } from "@/context/InventoryContext";

const SRPPageContent = ({ make }) => {
  const { inventory = [], loading } = useInventory(); // fallback to [] for safety
  const [showFilters, setShowFilters] = useState(false);
  const { IsTab, IsMob } = useDevice();
  console.log("inventory data in SRPPageContent:", inventory);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("p")) || 1;
  const itemsPerPage = 12;
  const sort = searchParams.get("sort") || "latest";
  const searchParam = searchParams.get("s") || "";

  const filters = useMemo(
    () => ({
      make: normalize(searchParams.get("make") || ""),
      year: normalize(searchParams.get("year") || ""),
      model: normalize(searchParams.get("model") || ""),
      trim: normalize(searchParams.get("trim") || ""),
      condition: normalize(searchParams.get("condition") || ""),
      color: normalize(searchParams.get("color") || ""),
      type: normalize(searchParams.get("type") || ""),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    }),
    [searchParams]
  );

  // Filtering, sorting, and pagination logic (client-side)
  const filteredItems = useMemo(() => {
    let result = Array.isArray(inventory) ? inventory : [];
    if (searchParam) {
      const term = normalize(searchParam);
      result = result.filter(
        (item) =>
          normalize(item.make || "").includes(term) ||
          normalize(item.model || "").includes(term) ||
          normalize(item.trim || "").includes(term) ||
          normalize(item.year ? String(item.year) : "").includes(term) ||
          normalize(item.conditionType || "").includes(term)
      );
    }
    if (filters.make)
      result = result.filter((i) => normalize(i.make) === filters.make);
    if (filters.year)
      result = result.filter((i) => normalize(String(i.year)) === filters.year);
    if (filters.model)
      result = result.filter((i) => normalize(i.model) === filters.model);
    if (filters.trim)
      result = result.filter((i) => normalize(i.trim) === filters.trim);
    if (filters.condition)
      result = result.filter(
        (i) => normalize(i.conditionType) === filters.condition
      );
    if (filters.color)
      result = result.filter(
        (i) =>
          normalize(
            i.color?.exterior || i?.specifications?.color?.exterior || ""
          ) === filters.color
      );
    if (filters.type)
      result = result.filter(
        (i) => normalize(i.type || i.bodyType) === filters.type
      );
    if (filters.minPrice)
      result = result.filter((i) => i?.price?.msrp >= Number(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((i) => i?.price?.msrp <= Number(filters.maxPrice));

    // Sorting
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
        break;
    }
    return result;
  }, [inventory, filters, sort, searchParam]);

  // Helper: Cleans and sorts unique options, preserving original for label, normalizing for value
  const cleanOptions = (arr, isYear = false) => {
    const unique = [
      ...new Map(arr.filter(Boolean).map((v) => [normalize(v), v])).values(),
    ];
    return isYear
      ? unique.sort((a, b) => Number(b) - Number(a))
      : unique.sort((a, b) => normalize(a).localeCompare(normalize(b)));
  };

  // Helper: Formats options as { label, value }
  const buildOptions = (arr, isYear = false) => {
    const values = cleanOptions(arr, isYear);
    return values.map((v) => ({
      label: v?.toString() || "",
      value: normalize(v?.toString()) || "",
    }));
  };

  // Memoize dynamic filter options
  const dynamicOptions = useMemo(
    () => ({
      make: buildOptions(inventory.map((i) => i.make)),
      year: buildOptions(
        inventory.map((i) => i.year),
        true
      ),
      model: buildOptions(inventory.map((i) => i.model)),
      trim: buildOptions(inventory.map((i) => i.trim)),
      condition: buildOptions(inventory.map((i) => i.conditionType)),
      color: buildOptions(
        inventory.map(
          (i) => i?.specifications?.color?.exterior || i?.color?.exterior
        )
      ),
      type: buildOptions(inventory.map((i) => i.bodyType || i.type)),
    }),
    [inventory]
  );

  const paginatedItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredItems, currentPage, itemsPerPage]
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
            {showFilters && (
              <div className="fixed inset-0 z-50 flex">
                <div
                  className="fixed inset-0 bg-black/30"
                  onClick={() => setShowFilters(false)}
                />
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
