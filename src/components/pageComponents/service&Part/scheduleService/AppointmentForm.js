export default function AppointmentForm() {
    return (
        <div className="section-container ">

        <form className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">First Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your first name" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your last name" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Enter your email" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="Enter your phone number" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
            </div>

            <div className="bg-gray-100 rounded p-4 mt-2">
                <div className="font-semibold text-xs text-gray-700 mb-3 tracking-widest">VEHICLE DETAILS</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input type="text" placeholder="Enter year" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="text" placeholder="Enter make" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="text" placeholder="Enter model" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input type="text" placeholder="0" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="text" placeholder="Enter style/trim" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="text" placeholder="Enter color" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" placeholder="Enter transmission" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="text" placeholder="Enter color" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 md:col-span-1" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Service Required</label>
                <textarea placeholder="How may we help?" rows={4} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>

            <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 font-semibold mt-2">Submit Service Request</button>
        </form>
        </div>
    );
}