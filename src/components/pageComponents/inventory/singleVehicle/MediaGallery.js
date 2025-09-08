"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function MediaGallery({ media }) {
  // Normalize media list
  const allMedia = [
    media?.imgFeatured?.url ? { ...media.imgFeatured, type: "image" } : null,
    ...(media?.imgGallery?.length
      ? media.imgGallery.map((g) => (g?.url ? { ...g, type: "image" } : null))
      : []),
    media?.videoUrl ? { url: media.videoUrl, type: "video" } : null,
  ].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);

  // Auto change every 5s
  useEffect(() => {
    if (!allMedia.length) return;
    const timer = setInterval(() => handleNext(), 5000);
    return () => clearInterval(timer);
  }, [activeIndex, allMedia.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % allMedia.length);
  };

  // Touch start
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  // Touch end
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 50) diff > 0 ? handlePrev() : handleNext();
    startX.current = null;
  };

  // Mouse down (start drag)
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  // Mouse up (end drag)
  const handleMouseUp = (e) => {
    if (!isDragging.current || startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 50) diff > 0 ? handlePrev() : handleNext();
    isDragging.current = false;
    startX.current = null;
  };

  // Mouse leave (cancel drag)
  const handleMouseLeave = () => {
    isDragging.current = false;
    startX.current = null;
  };

  if (!allMedia.length) {
    return (
      <div className="w-full aspect-video bg-slate-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500 text-sm">No media available</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video mx-auto">
      {/* Active Media */}
      <div
        className="relative aspect-video bg-slate-200 rounded-lg overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {allMedia[activeIndex]?.type === "video" ? (
          <video
            src={allMedia[activeIndex].url}
            controls
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={allMedia[activeIndex].url}
            alt={`media-${activeIndex}`}
            className="w-full h-full object-contain pointer-events-none"
          />
        )}

        {/* Arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {allMedia.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`border-2 rounded-md overflow-hidden ${
                idx === activeIndex ? "border-red-500" : "border-transparent"
              }`}
            >
              {m.type === "video" ? (
                <div className="relative w-20 h-14 bg-black flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              ) : (
                <img
                  src={m.url}
                  alt={`thumb-${idx}`}
                  className="w-20 h-14 object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
