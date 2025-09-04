import { RectangleVertical } from "lucide-react";

export default function FeatureCard({ number, title, description }) {
  return (
    <div className="border border-slate-800 hover:bg-slate-900 hover:border-blue-700 hover:-translate-y-2  p-8 flex group transition-colors duration-400">
      <div className="flex items-start gap-8 w-5/6">
        <div className="text-2xl font-light text-gray-400 mt-1">{number}</div>
        <div className="flex-1">
          <h3 className=" text-2xl mb-6">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="w-1/6 place-content-center justify-items-center">
        <div className="w-16 h-16 justify-items-center place-content-center bg-blue-950 rounded-full transition-colors duration-200 group-hover:bg-blue-500 flex items-center justify-center">
          <RectangleVertical className="-rotate-45 h-6 w-4 text-blue-600" />
        </div>
      </div>
    </div>
  );
}