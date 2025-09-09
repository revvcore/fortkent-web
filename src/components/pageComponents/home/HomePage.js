import Carasoul from "@/components/commonComponents/carasoul/Carasoul";
import Banner from "./Banner";
import ExperiencePage from "./ExperiencePage";
import FeaturedVehicles from "./FeaturedVehicles";
export default function HomePage() {
  return (
    <div>
      <Banner />
      <Carasoul />
      <FeaturedVehicles />
      <ExperiencePage />
    </div>
  );
}
