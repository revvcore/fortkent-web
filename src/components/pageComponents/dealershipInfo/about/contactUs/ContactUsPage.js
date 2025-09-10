import Promo from "../../../../commonComponents/PageHeader";
import ContactForm from "./ContactForm";


export default function ContactUsPage() {
    return(
        <>
        <div>
            <Promo title="Contact Us" />
            
            <ContactForm/>
        </div>
        </>
    )
}