"use client";
import ExploreOtherVehicles from "../relatedVehicle/ExploreOtherVehicles";
import RelatedVehicles from "../relatedVehicle/RelatedVehicles";
import ActionsTab from "./ActionsTab";
import DescTab from "./DescTab";
import MediaGallery from "./MediaGallery";
import UnitSpecsTab from "./UnitSpecsTab";
import { useState } from "react";

export default function SingleVehiclePage({ item }) {
  const [activeTab, setActiveTab] = useState("desc");
  const vehicleName =
    `${item.year} ${item.make} ${item.model} ${item.trim} ${item.class} ${item.conditionType} ${item?.specifications?.color?.exterior} ${item.stockNumber}` ||
    "Unknown Vehicle";

  return (
    <main>
      <section className="w-full bg-white">
        <div className="section-container flex flex-col md:flex-row py-12 gap-6">
          <div className="w-full md:w-2/3">
            <div className="flex text-sm text-gray-500 mb-4">
              Home - {item.conditionType} - {vehicleName}
            </div>
            <MediaGallery media={item.media} />
            <div className="py-4">
              <div className="flex mb-4 border border-slate-300 w-fit rounded-full overflow-clip p-1">
                <button
                  className={`py-2 px-4 font-semibold 
                    ${
                      activeTab === "unitSpecs"
                        ? "bg-primary-500 text-white rounded-full"
                        : "text-gray-500 cursor-pointer"
                    }`}
                  onClick={() => setActiveTab("unitSpecs")}
                >
                  Unit Specifications
                </button>
                <button
                  className={`py-2 px-4 font-semibold
                    ${
                      activeTab === "desc"
                        ? "bg-primary-500 text-white rounded-full"
                        : "text-gray-500 cursor-pointer"
                    }`}
                  onClick={() => setActiveTab("desc")}
                >
                  Description
                </button>
              </div>
              {activeTab === "unitSpecs" && <UnitSpecsTab item={item} />}
              {activeTab === "desc" && <DescTab item={item} />}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div>
              <ActionsTab item={item} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pt-8 pb-12 bg-slate-50">
        <div className="section-container">
          <h2 className="text-center mb-4">Related Vehicles</h2>
          <RelatedVehicles make={item.make} />
        </div>
      </section>
      <section className="w-full pt-8 pb-12 bg-slate-50">
        <div className="section-container">
          <h2 className="text-center mb-4">Explore More Options</h2>
          <ExploreOtherVehicles make={item.make} />
        </div>
      </section>
    </main>
  );
}
