import OEMPage from "@/components/pageComponents/oem/OEMPage";
import { oemMakes } from "@/data/oemMakes";

export default async function oemPage({ params }) {
  const { make } = await params;

  const oemMake = oemMakes.find(
    (m) => m?.make?.toLowerCase() === make?.toLowerCase()
  );

  if (!oemMake) {
    return <div>OEM Make not found.</div>;
  }

  return <OEMPage make={oemMake} />;
}
