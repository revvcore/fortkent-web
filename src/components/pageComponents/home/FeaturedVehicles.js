import RelatedVehicles from "../inventory/relatedVehicle/RelatedVehicles";

export default function FeaturedVehicles() {
  return (
    <div className="w-full bg-slate-900">
      <div className="section-container pt-12 pb-20">
        <h2 className="text-white text-center mb-6">Featured Vehicles</h2>
        <RelatedVehicles toShow={3} toScroll={1} />
      </div>
    </div>
  );
}
