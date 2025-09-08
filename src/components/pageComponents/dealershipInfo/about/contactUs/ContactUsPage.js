import Promo from "../../../../commonComponents/Promo";
import ContactForm from "./ContactForm";
import HeroSection from "./HeroSection";

export default function ContactUsPage() {
    return(
        <>
        <div>
            <Promo title="Contact Us" />
            <HeroSection/>
            <ContactForm/>
        </div>
        </>
    )
}