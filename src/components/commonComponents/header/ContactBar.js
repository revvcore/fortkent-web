import { siteIdentity } from "@/data/siteIdentity";
import { MapPin, Phone } from "lucide-react";

export default function ContactBar(){
    return (
        <div className="bg-black p-2">

        <div className="section-container flex flex-col md:flex-row  text-white ">
            <div className="flex items-center ">
  <MapPin className="stroke-red-600 text-red-600 w-4 h-4 " />
 
  <h4 className="uppercase ml-2">{siteIdentity.address}{" "}{siteIdentity.city}{", "}{siteIdentity.state}{" "}{siteIdentity.zip}{"  "}</h4>
            </div>

             <div className="flex items-center ml-3 ">
  <Phone  className="stroke-red-600 text-red-600 w-4 h-4 fill-current mr-2" />
  <h4 className=""> Sales{":"}{siteIdentity.phoneSale}{" "}</h4>
            </div>
            <div className="flex items-center  ml-3">
  <Phone  className="stroke-red-600 text-red-600 w-4 h-4 fill-current mr-2" />
  <h4 className=""> Services{":"}{siteIdentity.phoneService}{" "}</h4>
            </div>
           
        </div>
        </div>
    )
}