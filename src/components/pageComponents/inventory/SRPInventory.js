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
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "price";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
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
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Available Vehicles: <span>{totalItems}</span>
            </p>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => updateQuery("sortBy", e.target.value)}
                className="styleInput"
              >
                <option value="price">Sort by Price</option>
                <option value="year">Sort by Year</option>
              </select>
              <button
                onClick={() =>
                  updateQuery("sortOrder", sortOrder === "asc" ? "desc" : "asc")
                }
                className="text-sm border rounded-md px-2 py-1"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-8">
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
