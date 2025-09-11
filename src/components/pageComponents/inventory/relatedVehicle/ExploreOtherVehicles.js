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

export default function ExploreOtherVehicles({ make, toShow, toScroll }) {
  const { inventory, loading } = useInventory();

  const otherVehicles = useMemo(() => {
    if (!inventory || inventory.length === 0) return [];
    // Group vehicles by make, excluding the current make
    const vehiclesByMake = inventory.reduce((acc, v) => {
      if (v.make !== make) {
        if (!acc[v.make]) acc[v.make] = [];
        acc[v.make].push(v);
      }
      return acc;
    }, {});
    // Pick one vehicle from each make
    const result = Object.values(vehiclesByMake)
      .map((vehicles) => vehicles[0])
      .slice(0, 6);
    return result;
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
          {otherVehicles.map((vehicle) => (
            <div key={vehicle._id} className="px-1 h-full flex-1">
              <VehicleCard item={vehicle} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
