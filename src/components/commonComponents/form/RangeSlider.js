"use client";
import { useState, useEffect } from "react";

export default function RangeSlider({
  label = "Select Range",
  min = 0,
  max = 100,
  step = 1,
  values = [0, 100],
  onChange,
}) {
  const [minVal, setMinVal] = useState(values[0] ?? min);
  const [maxVal, setMaxVal] = useState(values[1] ?? max);

  useEffect(() => {
    setMinVal(values[0] ?? min);
    setMaxVal(values[1] ?? max);
  }, [values, min, max]);

  const handleChange = (newMin, newMax) => {
    const clampedMin = Math.max(min, Math.min(newMin, newMax - step));
    const clampedMax = Math.min(max, Math.max(newMax, newMin + step));
    setMinVal(clampedMin);
    setMaxVal(clampedMax);
    if (onChange) onChange([clampedMin, clampedMax]);
  };

  return (
    <div>
      <label className="styleLabel">{label}</label>

      {/* Slider Track */}
      <div className="relative w-full">
        <div className="absolute h-2 w-full bg-gray-200 rounded"></div>

        {/* Highlight */}
        <div
          className="absolute h-2 bg-primary-500 rounded"
          style={{
            left: `${(minVal / max) * 100}%`,
            right: `${100 - (maxVal / max) * 100}%`,
          }}
        ></div>

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) =>
            handleChange(
              Math.min(Number(e.target.value), maxVal - step),
              maxVal
            )
          }
          className="absolute w-full -translate-y-1 appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:border 
            [&::-webkit-slider-thumb]:border-gray-400 
            [&::-webkit-slider-thumb]:shadow 
            [&::-webkit-slider-thumb]:pointer-events-auto"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) =>
            handleChange(
              minVal,
              Math.max(Number(e.target.value), minVal + step)
            )
          }
          className="absolute w-full -translate-y-1 appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:border 
            [&::-webkit-slider-thumb]:border-gray-400 
            [&::-webkit-slider-thumb]:shadow 
            [&::-webkit-slider-thumb]:pointer-events-auto"
        />
      </div>

      {/* Values (with inputs) */}
      <div className="flex items-center justify-between mt-5 gap-3 text-sm text-gray-600">
        <input
          type="number"
          value={minVal}
          min={min}
          max={maxVal - step}
          step={step}
          onChange={(e) => handleChange(Number(e.target.value), maxVal)}
          className="styleInput w-24"
        />
        <span className="text-gray-400">-</span>
        <input
          type="number"
          value={maxVal}
          min={minVal + step}
          max={max}
          step={step}
          onChange={(e) => handleChange(minVal, Number(e.target.value))}
          className="styleInput w-24"
        />
      </div>
    </div>
  );
}
