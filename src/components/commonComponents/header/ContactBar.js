import { siteIdentity } from "@/data/siteIdentity";
import { MapPin, Phone } from "lucide-react";

export default function ContactBar(){
    return (
        <div className="bg-black p-1">

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex  text-white ">
            <div className="flex items-center ">
  <MapPin className="stroke-black text-gray-800 fill-current" />
  <h4 className="uppercase">{siteIdentity.address}{" "}{siteIdentity.city}{", "}{siteIdentity.state}{" "}{siteIdentity.zip}{"  "}</h4>
            </div>

             <div className="flex items-center ml-3 ">
  <Phone  className="stroke-current text-gray-800 fill-current mr-2" />
  <h4 className=""> Sales{":"}{siteIdentity.phoneSale}{" "}</h4>
            </div>
            <div className="flex items-center  ml-3">
  <Phone  className="stroke-black text-gray-800 fill-current mr-2" />
  <h4 className=""> Services{":"}{siteIdentity.phoneService}{" "}</h4>
            </div>
           
        </div>
        </div>
    )
}