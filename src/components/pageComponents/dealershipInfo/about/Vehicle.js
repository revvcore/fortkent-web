export default function Vehicle(){
    return(
        <>
        <div className="section-container py-10 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-2 ">
                        <img
                            className="rounded-3xl h-[400px] w-full object-cover"
                            src="/about/vehicles.webp"
                            alt="Vehicle Image"
                        />
                    </div>
                    <div className="p-2 place-content-center">
                        <h2>Vehicle Accessories</h2>
                        <ul className="list-disc text-gray-400 pl-6">
                            <li>Color-matched components</li>
                            <li>Chrome components</li>
                            <li>Custom decals</li>
                            <li>Custom covers</li>
                            <li>Windshields</li>
                            <li>Gauges</li>
                            <li>Snow flaps</li>
                            <li>Mirrors</li>
                            <li>Accessory storage bags</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </>
    )
}