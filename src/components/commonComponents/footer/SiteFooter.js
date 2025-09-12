import { siteIdentity } from "@/data/siteIdentity";
import { salesServiceHours, customerSupport } from "@/data/footerInfo";
import { Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <>
      <div className="py-6 bg-[#232323]">
        <div className="section-container">
          {/* Upper Secion */}
          <div className="grid justify-items-center grid-cols-1 lg:grid-cols-3 lg:gap-6 ">
            <div>
              <div>
                <img
                  className="h-12 "
                  src={siteIdentity.logo}
                  alt={siteIdentity.siteName}
                />
              </div>
              <div className="mt-5 flex gap-4">
                {siteIdentity?.socialLinks?.map((link, idx) => (
                  <a href={link.url} key={idx}>
                    <img
                      className="w-6 aspect-square"
                      src={`/icons/social/${link.icon}.webp`}
                    />
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-white text-xs">
                  **See <span className="text-red-600">TERMS</span> for details.
                  Plus, government fees & taxes, any finance charges, any dealer
                  document processing charge, any electronic filing charge,
                  emission testing charge, Freight (Transportation to Dealer) &
                  Additional Dealer Markup (A.D.M.). These charges are subject
                  to change without notice. Pricing may exclude any added parts,
                  accessories or installation unless otherwise noted. ALL SALE
                  PRICES INCLUDE FACTORY INCENTIVES.
                </p>
              </div>
            </div>
            <div className="text-white w-full lg:max-w-sm">
              <h2 className=" text-center bg-neutral-800 p-6">
                Sales & Service Hours
              </h2>
              <div className="divide-gray-700">
                {salesServiceHours.map((item, idx) => (
                  <div
                    key={item.day}
                    className={`flex justify-between p-3 ${item.highlight ? "bg-neutral-800" : "hover:bg-neutral-800"
                      }`}
                  >
                    <span>{item.day}</span>
                    <span
                      className={item.closed ? "text-red-500 font-medium" : ""}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-white w-full lg:max-w-sm">
              <h2 className=" text-center bg-neutral-800 p-6">
                Customer Support
              </h2>
              <div className="divide-gray-700">
                {customerSupport.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`flex justify-between p-3 ${item.highlight ? "bg-neutral-800" : "hover:bg-neutral-800"
                      }`}
                  >
                    <span>{item.label}</span>
                    <span className={item.bold ? "font-medium" : ""}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Lower Section */}
          <div className="text-white mt-10 flex flex-col lg:flex-row  lg:justify-between">
            <div className="flex flex-col lg:flex-row">
              

                <p className="">
                  2025 Fort Kent Powersports. All Rights Reserved.
                </p>
              
             

                <ul className="flex flex-row items-center">
                  <Link href="/about/contact-us">

                    <li className="hover:text-primary-500 lg:ml-6 mr-2 cursor-pointer">
                      Contact
                    </li>
                  </Link>
                  <li> |</li>
                  <Link href="privacy-policy">
                    <li className="hover:text-primary-500 ml-2 cursor-pointer">
                      Privacy Policy
                    </li>
                  </Link>
                </ul>
             
            </div>
            <p>Powered by i1SmartMarketing</p>
          </div>
        </div>
      </div>
    </>
  );
}
