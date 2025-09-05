import { siteIdentity } from "@/data/siteIdentity";
import { MapPin, Phone } from "lucide-react";

export default function ContactBar(){
    return (
        <div className="bg-black p-1">

        <div className="section-container flex  text-white ">
            <div className="flex items-center ">
  <MapPin className=" text-red-600 mr-4 mt-1" />
  <h4 className="uppercase">{siteIdentity.address}{" "}{siteIdentity.city}{", "}{siteIdentity.state}{" "}{siteIdentity.zip}{"  "}</h4>
            </div>

             <div className="flex items-center ml-3 ">
  <Phone  className=" text-red-600 mr-2" />
  <h4 className=""> Sales{":"}{siteIdentity.phoneSale}{" "}</h4>
            </div>
            <div className="flex items-center  ml-3">
  <Phone  className=" text-red-600 mr-2" />
  <h4 className=""> Services{":"}{siteIdentity.phoneService}{" "}</h4>
            </div>
           
        </div>
        </div>
    )
}