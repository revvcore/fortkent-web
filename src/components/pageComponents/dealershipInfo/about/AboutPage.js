import BRP from "./BRP";
import Clothing from "./Clothing";
import HowToContact from "./HowToContact";
import Promo from "../../../commonComponents/HomePageSlider";
import TrustedSales from "./TrustedSales";
import Vehicle from "./Vehicle";

export default function AboutPage() {
    return (
        <div>
            <Promo
                title="About"
            />
            <BRP />
            <TrustedSales />
            <HowToContact />
            <Clothing />
            <Vehicle />
        </div>
    );
}