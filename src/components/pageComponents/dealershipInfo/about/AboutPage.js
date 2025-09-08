import BRP from "./BRP";
import Clothing from "./Clothing";
import HowToContact from "./HowToContact";
import Promo from "../../../commonComponents/Promo";
import TrustedSales from "./TrustedSales";
import Vehicle from "./Vehicle";

export default function AboutPage() {
    return (
        <div>
            <Promo
                title="About"
                image="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
            <BRP />
            <TrustedSales />
            <HowToContact />
            <Clothing />
            <Vehicle />
        </div>
    );
}