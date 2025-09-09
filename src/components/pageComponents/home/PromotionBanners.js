"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { sliders } from "@/data/homePageSlider";
import MarkDownRenderer from "@/components/commonComponents/markdown/MarkDownRenderer";

export default function PromotionBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(null);
  const autoScrollRef = useRef(null);

  const videosPerPage = {
    mobile: 1,
    tablet: 1,
    desktop: 1,
  };

  const [currentVideosPerPage, setCurrentVideosPerPage] = useState(
    videosPerPage.desktop
  );

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCurrentVideosPerPage(videosPerPage.mobile);
      } else if (window.innerWidth < 1024) {
        setCurrentVideosPerPage(videosPerPage.tablet);
      } else {
        setCurrentVideosPerPage(videosPerPage.desktop);
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
            Math.ceil(sliders.length / currentVideosPerPage) - 1;
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
      }, 5000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, currentVideosPerPage]);

  const handlePrevious = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(sliders.length / currentVideosPerPage) - 1;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });

    // Resume auto-scrolling after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleNext = () => {
    setIsAutoScrolling(false);
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.ceil(sliders.length / currentVideosPerPage) - 1;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });

    // Resume auto-scrolling after 10 seconds
    setTimeout(() => setIsAutoScrolling(true), 10000);
  };

  const handleVideoHover = (videoId, isHovering) => {
    if (isHovering) {
      setIsAutoScrolling(false);
      setPlayingVideo(videoId);
    } else {
      setPlayingVideo(null);
      // Resume auto-scrolling after a short delay
      setTimeout(() => setIsAutoScrolling(true), 2000);
    }
  };

  const getCurrentVideos = () => {
    const startIndex = currentIndex * currentVideosPerPage;
    return sliders.slice(startIndex, startIndex + currentVideosPerPage);
  };

  const totalPages = Math.ceil(sliders.length / currentVideosPerPage);

  return (
    <div className="overflow-hidden mt-5 ">
      <div className="flex items-center justify-center pb-1 bg-black">
        {/* Left Arrow */}
        <button
          onClick={handlePrevious}
          className="absolute -left-2 z-20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
          aria-label="Previous videos"
        >
          <ChevronLeft className="w-8 h-8 transition-transform duration-200" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-2 z-20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
          aria-label="Next videos"
        >
          <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Video Grid Container */}
        <div className="w-full h-fit max-w-full  overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sliders.map((video) => (
              <div
                key={video._id}
                className="min-w-full group relative border border-white/10"
                onMouseEnter={() => handleVideoHover(video._id, true)}
                onMouseLeave={() => handleVideoHover(video._id, false)}
              >
                {/* Video Container */}
                <div className="relative h-[400px] overflow-hidden">
                  <video
                    className="w-full object-cover transition-transform duration-500"
                    poster={video.fallBackImg}
                    muted
                    loop
                    playsInline
                    onLoadedData={(e) => {
                      if (playingVideo === video._id) {
                        e.target.play();
                      }
                    }}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-6">
                      <MarkDownRenderer content={video?.content} />
                    </div>
                  </div>

                  {/* Video Overlay (Play/Pause button) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-end text-white">
                        <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                          {playingVideo === video._id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center mt-2 space-x-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoScrolling(false);
                  setTimeout(() => setIsAutoScrolling(true), 10000);
                }}
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/30 hover:bg-white/60 hover:scale-110"
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
