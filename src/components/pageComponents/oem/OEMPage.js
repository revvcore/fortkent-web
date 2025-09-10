import OEMInventory from "./OEMInventory";
import OEMHeader from "@/components/commonComponents/header/OEMHeader";
import LineupModels from "./LineupModels";
import OEMBanners from "./OEMBanners";

export default function OEMPage({ make }) {
  return (
    <>
      <OEMHeader make={make} />
      <OEMBanners make={make.make} isOEM={false} />
      <LineupModels make={make.make} />
      <OEMInventory make={make.make} />
    </>
  );
}
