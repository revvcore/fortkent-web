"use client";
import RelatedVehicles from "../relatedVehicle/RelatedVehicles";
import ActionsTab from "./ActionsTab";
import DescTab from "./DescTab";
import MediaGallery from "./MediaGallery";

export default function SingleVehiclePage({ item }) {
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
            <DescTab item={item} />
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
    </main>
  );
}
