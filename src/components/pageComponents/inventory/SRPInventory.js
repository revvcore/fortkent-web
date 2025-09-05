"use client";
import { Suspense } from "react";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import SRPItem from "@/components/pageComponents/inventory/SRPItem";
import Pagination from "./Pagination";

function SRPVehiclesInventory({ items, totalItems, itemsPerPage, loading }) {
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
          <div>
            <p className="text-sm text-gray-500">
              Available Vehicles: <span>{totalItems}</span>
            </p>
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

export default function SRPInventory(props) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <SRPVehiclesInventory {...props} />
    </Suspense>
  );
}
