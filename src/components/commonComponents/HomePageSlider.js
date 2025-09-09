export default function HomePageSlider({
    title = "About",
    image = "/images/promo"
}) {
    return (
        <div className="relative">
            <img
                className="w-full h-[300px] object-cover "
                src={image}
                alt={title}
            />
            {/* Overlay for darkness */}
            <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
            <h1 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold z-10">{title}</h1>
        </div>
    );
}