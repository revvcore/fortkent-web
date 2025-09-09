export default function HeroSection() {
    return (
        <section className="max-w-6xl mx-auto px-4 section-container py-10">
            <div className="text-center">
                <div className="text-red-600 font-bold text-lg mb-2">
                    Whether You Want an ATV Ride or an Open Water Adventure; Come Be a Part of the Fun!
                </div>
                <h1 className="text-3xl md:text-4xl italic mb-2" style={{ fontFamily: 'inherit' }}>
                    Join Us at One of Our Many Powersports Events Throughout the Year
                </h1>
                <div className="text-gray-600 text-base md:text-lg mb-8 max-w-3xl mx-auto">
                    The Fort Kent Powersports Team loves to ride! We host and join in on multiple events going on in and around Edmundston, Frenchville, Caribou, and Presque Isle. Check out our events below.
                </div>
                <div className="bg-gray-100 rounded p-4 mt-4">
                    <span className="text-gray-500 text-lg">Sorry, there are currently no events! Please check back soon!</span>
                </div>
            </div>
        </section>
    );
}