import { siteIdentity } from "@/data/siteIdentity";
// import { MapIcon, MapPin, Phone, PhoneCallIcon } from "lucide-react";
import Link from "next/link";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function ContactBar() {
  return (
    <div className="bg-black w-full ">
      <div className="section-container h-8 flex text-white gap-3 items-center text-sm justify-start">
        <Link href={siteIdentity?.mapLink || "#"} className="flex items-center">
          <MapPinIcon className="stroke-primary-500 text-primary-500 w-4 h-4" />
          <p className="uppercase ml-2 md:block hidden">
            {siteIdentity.address} {siteIdentity.city}, {siteIdentity.state}{" "}
            {siteIdentity.zip}
          </p>
          <p className="md:hidden uppercase ml-2">Location</p>
        </Link>

        <Link
          href={`tel:${siteIdentity.phoneSale}`}
          className="flex items-center"
        >
          <PhoneIcon className="stroke-primary-500 text-primary-500 w-4 h-4 " />
          <p className="uppercase ml-2 md:block hidden">
            Sales: {siteIdentity.phoneSale}
          </p>
          <p className="md:hidden uppercase ml-2">Sales</p>
        </Link>
        <Link
          href={`tel:${siteIdentity.phoneService}`}
          className="flex items-center"
        >
          <PhoneIcon className="stroke-primary-500 text-primary-500 w-4 h-4 " />
          <p className="uppercase ml-2 md:block hidden">
            Services: {siteIdentity.phoneService}
          </p>
          <p className="md:hidden uppercase ml-2">Services</p>
        </Link>
      </div>
    </div>
  );
}
