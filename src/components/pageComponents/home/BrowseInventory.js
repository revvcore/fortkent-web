const brands = [
    { name: "POLARIS", src: "/inventory/polaris.png" },
    { name: "KAYO", src: "/inventory/kayo.png" },
    { name: "can-am", src: "/inventory/can-am.png" },
    { name: "ski-doo", src: "/inventory/skidoo.png" },
    { name: "sea-doo", src: "/inventory/seadoo.png" },
    { name: "LYNX", src: "/inventory/lynx.png" },
    { name: "WIDESCAPE", src: "/inventory/widescape.webp" },
    { name: "TRITON", src: "/inventory/Triton.png" },
    { name: "CAM SUPERLINE", src: "/inventory/camsuperline.png" },
    { name: "TRIFECTA", src: "/inventory/trifecta.png" },
    { name: "DURABULL", src: "/inventory/durabull.avif" },
    { name: "EVINRUDE", src: "/inventory/evinrude.png" },
    { name: "MANITOU", src: "/inventory/manitou.jpg" },
    { name: "MERCURY", src: "/inventory/mercury.jpg" },
    { name: "NITRO trailers", src: "/inventory/nitro-trailers.png" },
    { name: "YAMAHA", src: "/inventory/yamaha.png" },
];

export default function BrowseInventory() {
    return (
        <div className="py-10">
            <h2 className="text-center mb-8">Browse Inventory by Make</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-center">
                {brands.map((brand) => (
                    <div key={brand.name} className="flex flex-col items-center justify-center">
                        <img
                            src={brand.src}
                            alt={brand.name}
                            title={brand.name}
                            className="max-h-16 md:max-h-20 object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-300"
                            style={{ maxWidth: '180px', width: '100%' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}