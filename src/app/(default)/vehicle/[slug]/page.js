import SingleVehiclePage from "@/components/pageComponents/inventory/singleVehicle/SingleVehiclePage";
import { generateInventorySlug } from "@/lib/GenerateInventorySlug";
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await fetch(
    "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f",
    { cache: "no-store" }
  );
  const data = await res.json();

  const item = data.find((i) => generateInventorySlug(i) === slug);

  if (!item) {
    return {
      title: "Vehicle not found",
      description: "The vehicle you are looking for does not exist.",
    };
  }

  return {
    title: `${item.year} ${item.make} ${item.model} ${
      item.trim || ""
    } | Fort Kent Inventory`,
    description:
      item.description ||
      `View details for ${item.year} ${item.make} ${item.model} at Fort Kent.`,
    openGraph: {
      title: `${item.year} ${item.make} ${item.model} ${
        item.trim || ""
      } | Fort Kent Inventory`,
      description:
        item.description ||
        `View details for ${item.year} ${item.make} ${item.model} ${
          item.trim || ""
        } at Fort Kent.`,
      images: item?.media?.imgFeatured?.url,
    },
  };
}
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
    return (
      <div className="p-6 text-red-500 text-center">Vehicle not found</div>
    );
  }

  return <SingleVehiclePage item={item} />;
}
