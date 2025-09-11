"use client";
import { sliders as defaultSliders } from "@/data/homePageSlider";
import React, { useState, useRef, useEffect } from "react";

// const sliders = [
//   {
//     _id: 1,
//     title: "2025 Ski-Doo Snowmobiles",
//     videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample MP4
//     fallBackImg:
//       "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=800",
//     overlay: true,
//     content: `
// ## 2025 Ski-Doo Snowmobiles
// A new breed of winter freedom is here
//     `,
//   },
//   // Add more slides as needed
// ];

const SLIDER_CACHE_KEY = "sliderBannersCache";
const SLIDER_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in ms

const getCachedSliders = () => {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(SLIDER_CACHE_KEY);
    if (!cached) return null;
    const { data, ts } = JSON.parse(cached);
    if (Date.now() - ts < SLIDER_CACHE_TTL) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
};

const setCachedSliders = (data) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      SLIDER_CACHE_KEY,
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {}
};

const SliderBanner = ({ interval = 5000 }) => {
  const [slides, setSlides] = useState(defaultSliders);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const autoplayRef = useRef();

  // On mount, try to load from cache, else use default and cache it
  useEffect(() => {
    const cached = getCachedSliders();
    if (cached) {
      setSlides(cached);
    } else {
      setSlides(defaultSliders);
      setCachedSliders(defaultSliders);
    }
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    if (hovered) return;

    autoplayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(autoplayRef.current);
  }, [active, hovered, slides.length, interval]);

  const goto = (idx) => setActive(idx);
  const prev = () =>
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setActive((prev) => (prev + 1) % slides.length);

  const slide = slides[active];

  return (
    <div
      className="slider-banner"
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "50vh",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Video or Image */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {slide.videoUrl ? (
          <video
            src={slide.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={slide.fallBackImg}
            style={{
              width: "100vw",
              height: "100vh",
              minHeight: "100%",
              minWidth: "100%",
              objectFit: "cover",
              filter: slide.overlay ? "brightness(0.5)" : "none",
              pointerEvents: "none",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <img
            src={slide.fallBackImg}
            alt={slide.title}
            style={{
              width: "100vw",
              height: "100vh",
              minHeight: "100%",
              minWidth: "100%",
              objectFit: "cover",
              filter: slide.overlay ? "brightness(0.5)" : "none",
            }}
            loading="lazy"
          />
        )}
        {slide.overlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 2,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="slider-content"
        style={{
          zIndex: 3,
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textShadow: "0 2px 8px #000",
          padding: "60px 16px",
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: slide.content }}
          style={{ width: "100%", fontSize: "2rem", textAlign: "center" }}
        />
        {/* Navigation Controls */}
        {slides.length > 1 && (
          <div
            style={{
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 24,
            }}
          >
            {/* Arrows */}
            <button
              aria-label="Previous"
              onClick={prev}
              style={{
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 44,
                height: 44,
                fontSize: 24,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              &#8592;
            </button>
            {/* Dots */}
            <div style={{ display: "flex", gap: 12 }}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => goto(idx)}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background:
                      idx === active ? "#fff" : "rgba(255,255,255,0.5)",
                    border: "2px solid #fff",
                    opacity: idx === active ? 1 : 0.7,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
            <button
              aria-label="Next"
              onClick={next}
              style={{
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 44,
                height: 44,
                fontSize: 24,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderBanner;
