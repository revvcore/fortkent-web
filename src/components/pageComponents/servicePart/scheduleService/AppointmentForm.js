
import { useState } from "react";
import { siteIdentity } from "@/data/siteIdentity";


export default function AppointmentForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        year: "",
        make: "",
        model: "",
        mileage: "",
        style: "",
        color: "",
        transmission: "",
        color2: "",
        service: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { ...form };
        console.log("Form Data Object:", formData);
        // You can handle the formData object as needed (e.g., send to API)
    };

    return (
        <div className="section-container py-10 ">
            <div className="text-center justify-items-center  ">
                <div className="max-w-3xl">
                    <h2>You'll Be Back Riding In No Time!</h2>
                    <p className="text-gray-400 mt-3">You can count on our experts at {siteIdentity.siteName} to provide you with industry-leading service and repair. When you schedule an appointment, we will work with your schedule to get you in as soon as possible, and then back out onto the road or maintaining your power equipment. You will ride away knowing that you received the best solutions possible!</p>
                </div>
            </div>

            <form className="max-w-xl mx-auto p-4 bg-white pt-10 space-y-4 " onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="styleLable">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" placeholder="Enter your first name" required className="styleInput" value={form.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" placeholder="Enter your last name" required className="styleInput" value={form.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" placeholder="Enter your email" required className="styleInput" value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" name="phone" placeholder="Enter your phone number" required className="styleInput" value={form.phone} onChange={handleChange} />
                    </div>
                </div>

                <div className="bg-gray-100 rounded p-4 mt-2">
                    <div className="font-semibold text-xs text-gray-700 mb-3 tracking-widest">VEHICLE DETAILS</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <input type="text" name="year" placeholder="Enter year" className="styleInput" value={form.year} onChange={handleChange} />
                        <input type="text" name="make" placeholder="Enter make" className="styleInput" value={form.make} onChange={handleChange} />
                        <input type="text" name="model" placeholder="Enter model" className="styleInput" value={form.model} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <input type="text" name="mileage" placeholder="0" className="styleInput" value={form.mileage} onChange={handleChange} />
                        <input type="text" name="style" placeholder="Enter style/trim" className="styleInput" value={form.style} onChange={handleChange} />
                        <input type="text" name="color" placeholder="Enter color" className="styleInput" value={form.color} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input type="text" name="transmission" placeholder="Enter transmission" className="styleInput" value={form.transmission} onChange={handleChange} />
                        <input type="text" name="color2" placeholder="Enter color" className="styleInput md:col-span-1" value={form.color2} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <label className="styleLable">Service Required</label>
                    <textarea name="service" placeholder="How may we help?" rows={4} className="styleInput" value={form.service} onChange={handleChange} />
                </div>

                <button type="submit" className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 font-semibold mt-2">Submit Service Request</button>
            </form>
        </div>
    );
}