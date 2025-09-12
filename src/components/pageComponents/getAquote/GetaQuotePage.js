import Promo from "../../commonComponents/PageHeader"
import GetAQuoteForm from "./GetAQuoteForm";
import HeroSecton from "./HeroSection";
export default function GetAQuotePage() {
    return (
        <>
            <Promo title="Get a Quote" />
            <HeroSecton />
            <GetAQuoteForm />
        </>
    );
}
