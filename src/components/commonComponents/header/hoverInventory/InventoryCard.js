import React from "react";

export default function InventoryCard({ logo, title, count, onClick }) {
  return (
    <div
      className="flex flex-row items-center justify-between border rounded-lg p-4 bg-white shadow hover:shadow-lg transition-all min-w-[160px] max-w-[300px] cursor-pointer"
      onClick={onClick}
    >
      <img src={logo} alt={title} className="h-16 w-36 object-contain mb-2" />
      <div className="font-bold text-base text-gray-800 text-center">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{count} vehicles</div>
    </div>
  );
}
