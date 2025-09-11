"use client";
// import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SpinLoader from "@/components/commonComponents/loader/SpinLoader";
import VehicleCard from "./VehicleCard";
import { useInventory } from "@/context/InventoryContext";
import { useMemo } from "react";

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

export default function RelatedVehicles({ make, toShow, toScroll }) {
  const { inventory, loading } = useInventory();

  // useEffect(() => {
  //   const fetchInventoryItems = async () => {
  //     setLoading(true);
  //     const response = await fetch(
  //       "https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f"
  //     );
  //     const data = await response.json();

  //     setInventoryItems(
  //       make
  //         ? data.filter((v) => v.make === make).slice(0, 12)
  //         : data.slice(0, 12)
  //     );

  //     setLoading(false);
  //   };

  //   fetchInventoryItems();
  // }, [make]); // ✅ runs again if `make` changes

  const filteredVehicles = useMemo(() => {
    return make
      ? inventory.filter((v) => v.make === make).slice(0, 6)
      : inventory.slice(0, 6);
  }, [inventory, make]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: toShow || 4,
    slidesToScroll: toScroll || 1,
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
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <SpinLoader />
        </div>
      ) : (
        <Slider {...settings}>
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="px-1 h-full flex-1">
              <VehicleCard item={vehicle} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
