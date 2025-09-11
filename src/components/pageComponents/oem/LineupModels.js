"use client";
import React, { useState, useEffect } from "react";
import { lineupModels } from "@/data/lineupModels";
import dynamic from "next/dynamic";
import Link from "next/link";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";

// Dynamic import for SSR compatibility
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function LineupModels({ make }) {
  const models = lineupModels.filter(
    (model) => model?.make?.toLowerCase() === make?.toLowerCase()
  );

  const categorizedModels = models.reduce((acc, model) => {
    const category = model?.lineupModel || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(model);
    return acc;
  }, {});

  const categories = Object.keys(categorizedModels);
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0] || "");
    }
  }, [make, categories, selectedCategory]);

  // Fixed slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Fixed: was "autoPlay"
    autoplaySpeed: 3000, // Fixed: was "autoplayInterval"
    arrows: true,
    adaptiveHeight: true,
    centerMode: false,
    variableWidth: false,
    // appendDots: (dots) => (
    //   <div className="py-2">
    //     <ul className="flex justify-center">{dots}</ul>
    //   </div>
    // ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-300 hover:bg-red-400 transition-colors" />
    ),
  };

  const currentModels = categorizedModels[selectedCategory] || [];

  return (
    <section className="w-full bg-slate-50 py-8 max-w-screen" id="models">
      <div className="section-container">
        <h2 className="mb-6">Lineup Models for {make}</h2>

        {models.length === 0 ? (
          <p>No lineup models available for {make}.</p>
        ) : (
          <>
            {/* Category tabs */}
            <div className="flex gap-2 mb-2 w-full overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-t font-semibold border-b-2 whitespace-nowrap ${
                    selectedCategory === category
                      ? "border-primary-500 text-primary-500 bg-white"
                      : "border-transparent text-gray-600 bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Slider container with proper styling */}
            <div className="slider-container">
              {currentModels.length > 0 ? (
                <Slider {...sliderSettings}>
                  {currentModels.map((model) => (
                    <div key={model.id} className="p-4">
                      <div className="border border-slate-300 rounded px-4 py-6 md:p-6 bg-white shadow-sm min-h-[200px] flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                        <div className="w-full md:w-1/2">
                          <img
                            src={"/images/no-image.webp"}
                            alt={model.title}
                            className="aspect-video object-contain w-full bg-slate-50"
                          />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                          <h4 className="font-semibold text-lg mb-2">
                            {model.title}
                          </h4>
                          {model.content && (
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                              {model.content}
                            </p>
                          )}
                          <p className="text-sm uppercase font-semibold text-gray-500">
                            Request a Quote
                          </p>
                          <Link href={`/inventory?make=${make}`} prefetch>
                            <StyledButton className="mt-4" size="sm">
                              Explore Inventory
                            </StyledButton>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <p>No models available in this category.</p>
              )}
            </div>
          </>
        )}

        <style jsx>{`
          .slider-container {
            position: relative;
          }

          :global(.slick-dots) {
            bottom: -40px;
          }

          :global(.slick-dots li button:before) {
            font-size: 12px;
            color: #cbd5e0;
          }

          :global(.slick-dots li.slick-active button:before) {
            color: #3182ce;
          }

          :global(.slick-prev),
          :global(.slick-next) {
            z-index: 1;
            width: 40px;
            height: 40px;
          }

          :global(.slick-prev) {
            left: -20px;
          }

          :global(.slick-next) {
            right: -20px;
          }

          :global(.slick-prev:before),
          :global(.slick-next:before) {
            font-size: 20px;
            color: #4a5568;
          }
        `}</style>
      </div>
    </section>
  );
}
