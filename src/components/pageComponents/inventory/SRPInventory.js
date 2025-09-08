"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import SRPItem from "@/components/pageComponents/inventory/SRPItem";
import Pagination from "./Pagination";

export default function SRPVehiclesInventory({
  items,
  totalItems,
  itemsPerPage,
  loading,
  cols = 2,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "latest";
  const gridColsClass = `grid-cols-1 md:grid-cols-${cols}`;

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    // Reset to first page on sort change
    if (key === "sort") params.set("p", 1);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white">
      {loading ? (
        <SpinLoader />
      ) : totalItems === 0 ? (
        <div className="w-full p-4">
          <p className="text-sm text-gray-500">No vehicles available</p>
        </div>
      ) : (
        <div className="w-full p-4 flex flex-col gap-4">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-500 mt-4">
              Available Vehicles: <span>{totalItems}</span>
            </p>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => updateQuery("sort", e.target.value)}
                className="styleInput"
              >
                <option value="latest">Sort by Latest (Default)</option>
                <option value="priceHigh">Sort by Price (High to Low)</option>
                <option value="priceLow">Sort by Price (Low to High)</option>
                <option value="yearLatest">Sort by Year (Latest to Old)</option>
                <option value="yearOld">Sort by Year (Old to Latest)</option>
              </select>
            </div>
          </div>

          <div className={`w-full grid ${gridColsClass} gap-4`}>
            {items.map((item) => (
              <SRPItem key={item._id} item={item} />
            ))}
          </div>

          <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} />
        </div>
      )}
    </div>
  );
}
