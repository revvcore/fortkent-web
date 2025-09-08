"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import SRPInventory from "../inventory/SRPInventory";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
// import SearchInventory from "../inventory/search/SearchInventory";

const SRPPageContent = ({ make }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("p")) || 1;
  const itemsPerPage = 12;
  const sort = searchParams.get("sort") || "latest";

  useEffect(() => {
    const fetchInventoryItems = async () => {
      setLoading(true);
      const response = await fetch(
        `https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f?make=${
          make || ""
        }`
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
  }, [inventoryItems, sort]);

  // ✅ paginate after filter
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-white relative">
      <div className="section-container py-12 flex flex-col items-start relative">
        {/* <div className="w-full">
          <SearchInventory />
        </div> */}
        <h2>{make} OEM Inventory</h2>
        <SRPInventory
          items={paginatedItems}
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
          loading={loading}
          sort={sort}
          cols={4}
          make={make}
        />
      </div>
    </div>
  );
};
export default function OEMInventory({ make }) {
  return (
    <Suspense fallback={<SpinLoader />}>
      <SRPPageContent make={make} />
    </Suspense>
  );
}
