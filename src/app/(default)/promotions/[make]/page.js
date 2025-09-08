import OEMPage from "@/components/pageComponents/oem/OEMPage";
import { oemMakes } from "@/data/oemMakes";

export default function oemPage({ params }) {
  const { make } = params;

  const oemMake = oemMakes.find((m) => m.toLowerCase() === make.toLowerCase());

  if (!oemMake) {
    return <div>OEM Make not found.</div>;
  }

  return <OEMPage make={oemMake} />;
}
