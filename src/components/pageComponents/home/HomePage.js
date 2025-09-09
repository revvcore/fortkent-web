import Carasoul from "@/components/commonComponents/carasoul/Carasoul";
import ExperiencePage from "./ExperiencePage";
import FeaturedVehicles from "./FeaturedVehicles";
import PromotionBanners from "./PromotionBanners";
import BrowseInventory from "./BrowseInventory";
export default function HomePage() {
  return (
    <div>
      <PromotionBanners/>
      <Carasoul />
      <BrowseInventory/>
      <FeaturedVehicles />
      <ExperiencePage />
    </div>
  );
}
