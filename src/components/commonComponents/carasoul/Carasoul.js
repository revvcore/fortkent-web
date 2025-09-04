"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { promotions as imageData } from "@/data/brandPromotions";

export default function Carasoul() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef(null);

  const imagesPerPage = {
    mobile: 1,
    tablet: 1,
    desktop: 1,
  };

  const [currentImagesPerPage, setCurrentImagesPerPage] = useState(
    imagesPerPage.desktop
  );

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCurrentImagesPerPage(imagesPerPage.mobile);
      } else if (window.innerWidth < 1024) {
        setCurrentImagesPerPage(imagesPerPage.tablet);
      } else {
        setCurrentImagesPerPage(imagesPerPage.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex =
            Math.ceil(imageData.length / currentImagesPerPage) - 1;
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 5000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, currentImagesPerPage]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(imageData.length / currentImagesPerPage) - 1;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(imageData.length / currentImagesPerPage) - 1;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const getCurrentImages = () => {
    const startIndex = currentIndex * currentImagesPerPage;
    return imageData.slice(startIndex, startIndex + currentImagesPerPage);
  };

  const totalPages = Math.ceil(imageData.length / currentImagesPerPage);

  return (
    <div className="overflow-hidden mt-5 mb-5">
      <div className="flex h-1/2 items-center justify-center p-8 relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute left-8 z-20 bg-gray-400 backdrop-blur-sm  text-white p-2 rounded-lg transition-all duration-300  "
          aria-label="Previous images"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-8 z-20 bg-gray-400 backdrop-blur-sm  text-white p-2 rounded-lg transition-all duration-300  "
          aria-label="Next images"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Image Grid Container */}
        <div className="w-full h-full max-w-7xl mx-auto page-container">
          <div className="grid grid-cols-1 transition-all duration-700 ease-in-out">
            {getCurrentImages().map((image, index) => (
              <div
                key={image.id}
                className="relative border border-white/10"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative h-[66vh] overflow-hidden">
                  <img
                    src={image.thumbnail}
                    alt={`Slide ${image.id}`}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center mt-12 space-x-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoScrolling(false);
                  setTimeout(() => setIsAutoScrolling(true), 10000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-black scale-125 shadow-lg"
                    : "bg-black hover:bg-white/60 hover:scale-110"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
