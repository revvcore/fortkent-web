
"use client";
import { useEffect, useState } from "react";

const brands = [
    { name: "POLARIS", src: "/images/inventory/polaris.png" },
    { name: "KAYO", src: "/images/inventory/kayo.png" },
    { name: "can-am", src: "/images/inventory/can-am.png" },
    { name: "ski-doo", src: "/images/inventory/skidoo.png" },
    { name: "sea-doo", src: "/images/inventory/seadoo.png" },
    { name: "LYNX", src: "/images/inventory/lynx.png" },
    { name: "WIDESCAPE", src: "/images/inventory/widescape.webp" },
    { name: "TRITON", src: "/images/inventory/Triton.png" },
    { name: "CAM SUPERLINE", src: "/images/inventory/camsuperline.png" },
    { name: "TRIFECTA", src: "/images/inventory/trifecta.png" },
    { name: "DURABULL", src: "/images/inventory/durabull.avif" },
    { name: "EVINRUDE", src: "/images/inventory/evinrude.png" },
    { name: "MANITOU", src: "/images/inventory/manitou.jpg" },
    { name: "MERCURY", src: "/images/inventory/mercury.jpg" },
    { name: "NITRO trailers", src: "/images/inventory/nitro-trailers.png" },
    { name: "YAMAHA", src: "/images/inventory/yamaha.png" },
];


const INVENTORY_URL =" https://portal.revvcore.com/export/inventory/json/680b71c9d79737af91836e8f";

export default function BrowseInventory() {
    const [availableMakes, setAvailableMakes] = useState([]);

    useEffect(() => {
        async function fetchInventory() {
            try {
                const res = await fetch(INVENTORY_URL);
                const data = await res.json();
                // Filter for available inventory
                const available = data.filter(
                    (item) => item.inventoryStatus && item.inventoryStatus.status === "Available" && item.make
                );
                // Get unique makes from available inventory
                const makesSet = new Set(
                    available.map((item) => (item.make || "").trim().toLowerCase())
                );
                setAvailableMakes(Array.from(makesSet));
            } catch (err) {
                setAvailableMakes([]);
            }
        }
        fetchInventory();
    }, []);

    // Map available makes to brand logos (case-insensitive match)
    const filteredBrands = brands.filter((brand) => {
        // Normalize both for matching
        const brandName = brand.name.trim().toLowerCase();
        // Special case: can-am in API might be "Can-Am" or "can-am"
        return availableMakes.some((make) => {
            // Allow loose match for common variations
            if (brandName === "can-am" && (make === "can-am" || make === "canam" || make === "can am")) return true;
            return brandName === make;
        });
    });

    return (
        <div className="py-10">
            <h2 className="text-center mb-8">Browse Inventory by Make</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-center">
                {filteredBrands.map((brand) => (
                    
                    <div key={brand.name} className="flex flex-col items-center justify-center">
                        {/* <p>{brand.name}</p> */}
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