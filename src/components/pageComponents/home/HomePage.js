import ExperiencePage from "./ExperiencePage";
import FeaturedVehicles from "./FeaturedVehicles";
import PromotionBanners from "./PromotionBanners";
import BrowseInventory from "./BrowseInventory";
import OEMBanners from "../oem/OEMBanners";
// import HomePageSlider from "@/components/commonComponents/PageHeader";
// import SliderBanner from "./HomePageSliders";
export default function HomePage() {
  return (
    <div>
      <PromotionBanners />
      {/* <SliderBanner /> */}
      <OEMBanners isOEM={false} />
      <BrowseInventory />
      <FeaturedVehicles />
      <ExperiencePage />
    </div>
  );
}
