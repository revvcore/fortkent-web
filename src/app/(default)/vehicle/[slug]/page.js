import SingleVehiclePage from "@/components/pageComponents/inventory/singleVehicle/SingleVehiclePage";
import { generateInventorySlug } from "@/lib/GenerateInventorySlug";

export default async function InventoryDetailPage({ params }) {
  const { slug } = await params;

  const res = await fetch(
    "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f",
    { cache: "no-store" }
  );
  const data = await res.json();

  // Find by matching slug
  const item = data.find((i) => generateInventorySlug(i) === slug);

  if (!item) {
    return <div className="p-6 text-red-500">Vehicle not found</div>;
  }

  return <SingleVehiclePage item={item} />;
}
