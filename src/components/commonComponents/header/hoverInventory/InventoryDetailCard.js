import React from "react";

export default function InventoryDetailCard({ imgUrl, model }) {
  return (
    <div className="flex group flex-col items-center justify-center border rounded-lg p-1 bg-white hover:bg-slate-200 shadow hover:shadow-lg transition-all h-[251px]  max-w-[300px] cursor-pointer">
      <img src={imgUrl} alt={model} className="h-40 w-full mb-2 object-cover" />
   
            <h4 className="text-base text-[#c36] text-center group-hover:text-purple-950">{model}</h4>
          
    </div>
  );
}
