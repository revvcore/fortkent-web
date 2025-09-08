import reviews from "@/data/reviews";
import ReviewsCard from "./ReviewsCard";

export default function HeroSection() {
    return (
        <div className="section-container">
            
        <div className=" p-6 min-h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto ">
                {reviews.map((review) => (
                    <ReviewsCard key={review.id} review={review} />
                ))}
            </div>
        </div>
        </div>
    );
}