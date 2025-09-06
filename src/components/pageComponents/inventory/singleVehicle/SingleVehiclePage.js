import ActionsTab from "./ActionsTab";

export default function SingleVehiclePage({ item }) {
  return (
    <div className="w-full bg-white">
      <div className="section-container flex flex-col md:flex-row py-12">
        <div className="w-full md:w-2/3 border"></div>
        <div className="w-full md:w-1/3 border">
          <div>
            <ActionsTab item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
