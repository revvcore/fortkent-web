"use client";
import { useState } from "react";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";


const countryOptions = [
    "United States",
    "Canada",
    "Mexico",
    "United Kingdom",
    "Australia",
    "Other"
];

export default function EmploymentForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
        comments: "",
        resume: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Form submitted!");
    };

    return (
        <form className="max-w-3xl mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
            {/* First four fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="w-full border rounded px-3 py-2"
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Last Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="lastName"
                        className="w-full border rounded px-3 py-2"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        name="email"
                        className="w-full border rounded px-3 py-2"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Phone <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        name="phone"
                        className="w-full border rounded px-3 py-2"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Address field full width */}
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="w-full border rounded px-3 py-2"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Next five fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block mb-1 font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        className="w-full border rounded px-3 py-2"
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        className="w-full border rounded px-3 py-2"
                        value={form.state}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">ZIP Code</label>
                    <input
                        type="text"
                        name="zip"
                        className="w-full border rounded px-3 py-2"
                        value={form.zip}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Country</label>
                    <select
                        name="country"
                        className="w-full border rounded px-3 py-2"
                        value={form.country}
                        onChange={handleChange}
                    >
                        {countryOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Upload Resume <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        name="resume"
                        className="w-full border rounded px-3 py-2"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Comments field full width */}
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                    <label className="block mb-1 font-medium">Comments</label>
                    <textarea
                        name="comments"
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                        value={form.comments}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Submit button under comments */}
            <div className="mt-6">
                <StyledButton type="submit" size="md" variant="primary" >
                    Submit
                </StyledButton>
            </div>
            <p className="mt-4 text-xs text-gray-400 text-left">
                By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase
            </p>
        </form>
    );
}