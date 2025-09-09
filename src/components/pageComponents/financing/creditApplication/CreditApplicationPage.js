import Promo from "@/components/commonComponents/HomePageSlider";
import VisitSite from "./VisitSite";
import FinanceOption from "./FinanceOption";
import CreditContact from "./CreditContact";

export default function CreditApplicationPage(){
    return(
        <>
        <Promo title="Credit Application" />
        <VisitSite/>
        <FinanceOption/>
        <CreditContact/>
        </>
    )
}