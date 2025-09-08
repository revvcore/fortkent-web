import { lineupModels } from "@/data/lineupModels";
import OEMInventory from "./OEMInventory";
import OEMHeader from "@/components/commonComponents/header/OEMHeader";
import LineupModels from "./LineupModels";

export default function OEMPage({ make }) {
  return (
    <>
      <OEMHeader make={make} />
      <LineupModels make={make} />
      <OEMInventory make={make} />
    </>
  );
}
