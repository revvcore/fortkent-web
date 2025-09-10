"use client";
import { oemBanners } from "@/data/oemBanners";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });
function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}
export default function OEMBanners({ make, isOEM }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div className="p-4">
        <ul className="flex justify-center">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-red-400 transition-colors my-6 mx-auto" />
    ),
  };

  const [banners, setBanners] = useState([]);
  useEffect(() => {
    if (make || isOEM === true) {
      const filteredBanners = oemBanners.filter(
        (banner) => banner.make?.toLowerCase() === make?.toLowerCase()
      );
      setBanners(filteredBanners);
    } else {
      setBanners(oemBanners);
    }
  }, [make]);

  return (
    <section className="w-full max-w-screen overflow-hidden" id="offers">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="">
            <img
              src={banner.bannerUrl}
              alt={banner.title}
              className="w-full h-[400px] object-contain"
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
