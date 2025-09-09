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
         <div className=" justify-items-center section-container py-10 ">
                <div className="max-w-3xl text-center">

                    <h1>Join The Fort Kent Powersports Team!</h1>
                    <p className="text-gray-400">We can’t wait for you to gain powersports employment and join our team of sales and service professionals. Submit your application and we’ll get back to you as soon as possible. In the meantime, feel free to learn more about us or to contact us for more information. Visit us today to meet with our family directly.</p>
                </div>
        <form className="max-w-3xl mx-auto p-6 bg-white pt-10" onSubmit={handleSubmit}>
            {/* First four fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="styleLable">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="styleInput"
                        placeholder="Enter your first name"
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="styleLable">Last Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="lastName"
                        className="styleInput"
                        placeholder="Enter your last name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="styleLable">Email <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        name="email"
                        className="styleInput"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="styleLable">Phone <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        name="phone"
                        className="styleInput"
                        placeholder="Enter your phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Address field full width */}
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                    <label className="styleLable">Address</label>
                    <input
                        type="text"
                        name="address"
                        className="styleInput"
                        placeholder="Enter your address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Next five fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="styleLable">City</label>
                    <input
                        type="text"
                        name="city"
                        className="styleInput"
                        placeholder="Enter your city"
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="styleLable">State</label>
                    <input
                        type="text"
                        name="state"
                        className="styleInput"
                        placeholder="Enter your state"
                        value={form.state}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="styleLable">ZIP Code</label>
                    <input
                        type="text"
                        name="zip"
                        className="styleInput"
                        placeholder="Enter your zip code"
                        value={form.zip}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="styleLable">Country</label>
                    <select
                        name="country"
                        className="styleInput"
                        value={form.country}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select your country</option>
                        {countryOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="styleLable">Upload Resume <span className="text-red-500">*</span></label>
                    <input
                        type="file"
                        name="resume"
                        className="styleInput"
                        accept=".pdf,.doc,.docx"
                        placeholder="Upload your resume"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Comments field full width */}
            <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                    <label className="styleLable">Comments</label>
                    <textarea
                        name="comments"
                        className="styleInput"
                        rows={4}
                        placeholder="Additional comments"
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
            </div>
    );
}