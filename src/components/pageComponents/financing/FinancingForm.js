"use client";
import { useState } from "react";

export default function FinancingForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        items: "",
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
        <div className="max-w-2xl mx-auto section-container  ">
            <p className="text-gray-500 text-center mb-6">
                Please note that your information is saved on our server as you enter it!
            </p>
            <form className="space-y-4 py-10 max-w-3xl mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="styleLable">First Name <span className="text-red-500">*</span></label>
                        <input type="text" name="firstName" className="styleInput" required value={form.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" name="lastName" className="styleInput" required value={form.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" className="styleInput" required value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Phone <span className="text-red-500">*</span></label>
                        <input type="tel" name="phone" className="styleInput" required value={form.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">Address</label>
                        <input type="text" name="address" placeholder="Enter street address" className="styleInput" value={form.address} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">City</label>
                        <input type="text" name="city" placeholder="Enter your city" className="styleInput" value={form.city} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">State</label>
                        <input type="text" name="state" placeholder="Enter your state" className="styleInput" value={form.state} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="styleLable">ZIP Code</label>
                        <input type="text" name="zip" placeholder="Enter your zip code" className="styleInput" value={form.zip} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label className="styleLable">Item(s) to Finance <span className="text-red-500">*</span></label>
                    <input type="text" name="items" placeholder="Enter item(s) to finance" className="styleInput" required value={form.items} onChange={handleChange} />
                </div>
                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-2">Get Pre-Approved</button>
                <p className="text-xs text-gray-500 mt-2">
                    By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase.
                </p>
            </form>
        </div>
    );
}
      