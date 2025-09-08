import BRP from "./BRP";
import Clothing from "./Clothing";
import HowToContact from "./HowToContact";
import Promo from "./Promo";
import TrustedSales from "./TrustedSales";
import Vehicle from "./Vehicle";

export default function AboutPage(){
    return(
        <>
        <div>
            <Promo/>
            <BRP/>
            <TrustedSales/>
            <HowToContact/>
            <Clothing/>
            <Vehicle/>
        </div>
        </>
    )
}