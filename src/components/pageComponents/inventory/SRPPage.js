"use client";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import SRPItem from "@/components/pageComponents/inventory/SRPItem";
import { siteIdentity } from "@/data/siteIdentity";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SRPPageContent() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const searchParam = useSearchParams();
  const pageParam = searchParam.get("p");
  useEffect(() => {
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, [pageParam]);

  const totalPages = Math.ceil(inventoryItems.length / itemsPerPage);
  const paginatedItems = inventoryItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

  console.log(inventoryItems);
  return (
    <div className="w-full bg-white">
      <div className="section-container py-12 flex flex-row items-start">
        <div className="w-1/3 flex items-center border p-4">
          <img
            src={siteIdentity.logo}
            alt={siteIdentity.name}
            className="w-32 h-auto"
          />
        </div>

        {loading ? (
          <SpinLoader />
        ) : (
          <div className="w-full md:w-2/3">
            <div className="w-full grid grid-cols-2 px-4 md:px-8 gap-8">
              {paginatedItems.map((item) => (
                <SRPItem key={item._id} item={item} />
              ))}
            </div>{" "}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  handlePrevPage();
                  window.history.replaceState(
                    null,
                    "",
                    `?p=${currentPage - 1}`
                  );
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => {
                  handleNextPage();
                  window.history.replaceState(
                    null,
                    "",
                    `?p=${currentPage + 1}`
                  );
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SRPPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <SRPPageContent />
    </Suspense>
  );
}
