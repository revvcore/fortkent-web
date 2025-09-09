import { Star, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ReviewsCard({ review }) {
  return (
    <div className="bg-gray-100 rounded-xl  p-4 max-w-sm w-full mx-auto flex flex-col gap-2 relative border border-gray-100  hover:-translate-y-2 duration-500">
      <div className="flex items-center gap-3">
        <Image
          src={review.avatar || "/images/default-avatar.png"}
          alt={review.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="font-semibold text-base">{review.name}</div>
          <div className="text-xs text-gray-500">{review.date}</div>
        </div>
        {review.source === "google" && (
          <img src="/public/icons/social/google.webp" alt="Google" className="w-6 h-6" />
        )}
      </div>
      <div className="flex items-center gap-1 mt-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
        ))}
        {review.verified && <CheckCircle size={18} className="text-blue-500 ml-1" />}
      </div>
      <div className="text-gray-700 text-sm mt-1">
        {review.review}
      </div>
      <div className="text-xs text-gray-400 mt-2 cursor-pointer hover:underline">Read more</div>
    </div>
  );
}
