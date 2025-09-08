export default function Clothing() {
    return (
        <>
            <div className="section-container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-2 place-content-center">
                        <h1>Clothing & Accessories</h1>
                        <ul className="list-disc text-gray-400 pl-6">
                            <li>Nylon clothing</li>
                            <li>GoreTex clothing</li>
                            <li>Helmets and accessories</li>
                            <li>Headwear, gloves, and mitts</li>
                            <li>Thermalwear clothing and footwear</li>
                            <li>Fashion clothing</li>
                            <li>Kids clothing</li>
                            <li>Bags and accessories</li>
                        </ul>
                    </div>
                    <div className="p-2">
                        <img
                            className="rounded-3xl"
                            src="/about/clothing.webp"
                            alt="BRP Image"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}