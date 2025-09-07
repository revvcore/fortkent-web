import BRP from "./BRP";
import HowToContact from "./HowToContact";
import Promo from "./Promo";
import TrustedSales from "./TrustedSales";

export default function AboutPage(){
    return(
        <>
        <div>
            <Promo/>
            <BRP/>
            <TrustedSales/>
            <HowToContact/>
        </div>
        </>
    )
}