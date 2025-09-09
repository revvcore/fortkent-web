"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { promotions as imageData } from "@/data/brandPromotions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carasoul() {
  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    appendDots: dots => (
      <div className="flex justify-center items-center mt-2 space-x-3">{dots}</div>
    ),
    customPaging: i => (
      <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-200 hover:bg-white/60 hover:scale-110" />
    ),
  };

  return (
    <div className="overflow-hidden  ">
      <div className="flex h-1/2 items-center justify-center relative">
        {/* Left Arrow */}
        <button
          onClick={() => sliderRef.current.slickPrev()}
          className="absolute  -left-1 z-20 bg-gray-400 backdrop-blur-sm text-white p-2  transition-all duration-300"
          aria-label="Previous images"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => sliderRef.current.slickNext()}
          className="absolute -right-2 z-20 bg-gray-400 backdrop-blur-sm text-white p-2  transition-all duration-300"
          aria-label="Next images"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Image Grid Container */}
        <div className="w-full h-full max-w-7xl mx-auto section-container">
          <Slider ref={sliderRef} {...settings}>
            {imageData.map((image, index) => (
              <div
                key={image._id}
                className="relative border border-white/10"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative h-[66vh] overflow-hidden">
                  {image.isRedirect ? (
                    <a
                      href={image.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={image.bannerUrl}
                        alt={image.title}
                        title={image.title}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </a>
                  ) : (
                    <img
                      src={image.bannerUrl}
                      alt={image.title}
                      title={image.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  )}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
