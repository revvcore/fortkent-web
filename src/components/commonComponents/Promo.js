export default function Promo({
    title = "About",
    image = "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800"
}) {
    return (
        <div className="relative">
            <img
                className="w-full h-[300px] "
                src={image}
                alt={title}
            />
            <h1 className="absolute inset-0 flex items-center justify-center text-white">{title}</h1>
        </div>
    );
}