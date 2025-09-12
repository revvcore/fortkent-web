
import React, { useEffect, useState } from "react";
import { oemMakes } from "@/data/oemMakes";
import InventoryCard from "./InventoryCard";
import InventoryDetailCard from "./InventoryDetailCard";
import normalize from "@/lib/normalize";


const browseList = [
  "New Inventory",
  "Pre-owned Inventory",
  "Schedule Test Ride",
  "Get a Quote",
  "Value Your Trade",
  "Polaris® Off-Road",
];

export default function InventoryHover({ show, onMouseEnter, onMouseLeave }) {
  const [makeCounts, setMakeCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [allInventory, setAllInventory] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f");
        const data = await res.json();
        // Count vehicles per normalized make
        const counts = {};
        data.forEach(item => {
          const make = item.make && normalize(item.make);
          if (make) {
            counts[make] = (counts[make] || 0) + 1;
          }
        });
        setMakeCounts(counts);
        setAllInventory(data);
      } catch {
  setMakeCounts({});
  setAllInventory([]);
      } finally {
  setLoading(false);
      }
    }
    if (show) fetchData();
  }, [show]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`fixed left-0 top-28 w-full h-2/3 z-50 bg-white shadow-2xl transition-all duration-600 ease-in-out ${
        show ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
      }`}
      style={{ transitionProperty: 'opacity, transform' }}
    >
      <div className="flex h-full">
        {/* Cards grid or detail view */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3  gap-6 p-8 overflow-y-auto">
          {loading ? (
            <div className="col-span-full text-center text-gray-400 text-lg">Loading...</div>
          ) : selectedMake ? (
            <>
              {/* Back button */}
              <div className="col-span-full gap-2 flex items-center">
              <button
                className=" flex items-center  text-red-500"
                onClick={() => setSelectedMake(null)}
              >
                <span className="mr-2">←</span> Go Back
              </button>
              |
              <p>Select a Model</p>

              </div>
              {
                allInventory
                  .filter(item => normalize(item.make) === selectedMake)
                  .map((item, idx) => (
                    <InventoryDetailCard
                      key={item.id || idx}
                      imgUrl={item.media.imgFeatured?.url}
                      model={item.model}
                    />
                  ))
              }
            </>
          ) : (
            <>
            <div className="col-span-full flex items-center mb-1 text-gray-700 ">

             <h3 className="">Select a Make</h3> 
            </div>
           {

             oemMakes
               .filter((make) => (makeCounts[normalize(make.make)] || 0) > 0)
               .map((make) => (
                 <InventoryCard
                   key={make.make}
                   logo={make.logo}
                   title={make.make}
                   count={makeCounts[normalize(make.make)]}
                   onClick={() => setSelectedMake(normalize(make.make))}
                 />
               ))
           }
           </>
          )}
        </div>
        {/* List on the right */}
        <div className="w-64 border-l p-8 flex flex-col justify-start bg-white h-full">
          <div className="font-bold text-2xl mb-4 text-gray-800">Browse</div>
          <ul className="space-y-3">
            {browseList.map((item, i) => (
              <li key={i} className="text-base text-gray-700 font-medium hover:text-red-500 cursor-pointer transition">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
