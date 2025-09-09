import { siteIdentity } from "@/data/siteIdentity";

export default function AppointmentForm() {
    return (
        <div className="section-container py-10 ">
            <div className="text-center justify-items-center  ">
                <div className="max-w-3xl">

                    <h2>You'll Be Back Riding In No Time!</h2>
                    <p className="text-gray-400 mt-3">You can count on our experts at {siteIdentity.siteName} to provide you with industry-leading service and repair. When you schedule an appointment, we will work with your schedule to get you in as soon as possible, and then back out onto the road or maintaining your power equipment. You will ride away knowing that you received the best solutions possible!</p>
                </div>
            </div>

        <form className="max-w-xl mx-auto p-4 bg-white pt-10 space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="styleLable">First Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your first name" required className="styleInput" />
                </div>
                <div>
                    <label className="styleLable">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Enter your last name" required className="styleInput" />
                </div>
                <div>
                    <label className="styleLable">Email <span className="text-red-500">*</span></label>
                    <input type="email" placeholder="Enter your email" required className="styleInput" />
                </div>
                <div>
                    <label className="styleLable">Phone <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="Enter your phone number" required className="styleInput" />
                </div>
            </div>

            <div className="bg-gray-100 rounded p-4 mt-2">
                <div className="font-semibold text-xs text-gray-700 mb-3 tracking-widest">VEHICLE DETAILS</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input type="text" placeholder="Enter year" className="styleInput" />
                    <input type="text" placeholder="Enter make" className="styleInput" />
                    <input type="text" placeholder="Enter model" className="styleInput" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input type="text" placeholder="0" className="styleInput" />
                    <input type="text" placeholder="Enter style/trim" className="styleInput" />
                    <input type="text" placeholder="Enter color" className="styleInput" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input type="text" placeholder="Enter transmission" className="styleInput" />
                    <input type="text" placeholder="Enter color" className="styleInput md:col-span-1" />
                </div>
            </div>

            <div>
                <label className="styleLable">Service Required</label>
                <textarea placeholder="How may we help?" rows={4} className="styleInput" />
            </div>

            <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 font-semibold mt-2">Submit Service Request</button>
        </form>
        </div>
    );
}