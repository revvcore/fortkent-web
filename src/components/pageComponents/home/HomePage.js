import ExperiencePage from "./ExperiencePage";
import FeaturedVehicles from "./FeaturedVehicles";
import PromotionBanners from "./PromotionBanners";
import BrowseInventory from "./BrowseInventory";
import OEMBanners from "../oem/OEMBanners";
export default function HomePage() {
  return (
    <div>
      <PromotionBanners />
      <OEMBanners isOEM={false} />
      <BrowseInventory />
      <FeaturedVehicles />
      <ExperiencePage />
    </div>
  );
}
