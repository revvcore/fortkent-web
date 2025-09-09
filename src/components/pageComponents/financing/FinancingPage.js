import Promo from "../../commonComponents/HomePageSlider";
import FinancingForm from "./FinancingForm";
import HeroSection from "./HeroSection";

export default function FinancingPage(){
    return(
        <>
        <div>
            <Promo title="Financing" />
            <HeroSection/>
            <FinancingForm/>
        </div>
        </>
    )
}