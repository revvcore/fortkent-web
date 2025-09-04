import { siteIdentity } from "@/data/siteIdentity";
import { Facebook } from "lucide-react";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <>
      <div className="py-6 bg-[#232323]">
        <div className="page-container">
          {/* Upper Secion */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 ">
            <div>
              <div>
                <img className="w-12 aspect-square" src="file.svg" alt="icon" />
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
            <div className=" text-white max-w-sm    ">
              <h2 className="text-xl  text-center  bg-neutral-800 p-6">
                Sales & Service Hours
              </h2>

              <div className=" divide-gray-700">
                {/* Mon-Fri */}
                <div className="flex justify-between p-3 hover:bg-neutral-800">
                  <span>Mon-Fri</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>

                {/* Sat */}
                <div className="flex justify-between p-3 bg-neutral-800">
                  <span>Sat</span>
                  <span>8:00 AM - 12:00 PM</span>
                </div>

                {/* Sun */}
                <div className="flex justify-between p-3 hover:bg-neutral-800">
                  <span>Sun</span>
                  <span className="text-red-500 font-medium">Gone Riding!</span>
                </div>
              </div>
            </div>
            <div className=" text-white max-w-sm    ">
              <h2 className="text-xl  text-center  bg-neutral-800 p-6">
                Customer Support
              </h2>

              <div className=" divide-gray-700">
                {/* Mon-Fri */}
                <div className="flex justify-between p-3 hover:bg-neutral-800">
                  <span>Sales</span>
                  <span>(207) 834-3607</span>
                </div>

                {/* Sat */}
                <div className="flex justify-between p-3 bg-neutral-800">
                  <span>Service </span>
                  <span>(207) 834-3659</span>
                </div>

                {/* Sun */}
                <div className="flex justify-between p-3 hover:bg-neutral-800">
                  <span>Parts </span>
                  <span className=" font-medium">(207) 834-3659</span>
                </div>
              </div>
            </div>
          </div>
          {/* Lower Section */}
          <div className="text-white mt-10 flex  justify-between">
            <p>
              2025 Fort Kent Powersports. All Rights Reserved.
              <span className="hover:text-red-600 ml-6 mr-2"> Contact</span>|
              <span className="hover:text-red-600 ml-2">Privacy Policy</span>
            </p>
            <p>Powered by i1SmartMarketing</p>
          </div>
        </div>
      </div>
    </>
  );
}
