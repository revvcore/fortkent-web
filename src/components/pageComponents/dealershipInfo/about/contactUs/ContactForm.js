"use client";
import { useState } from "react";
import { salesServiceHours } from "@/data/footerInfo";
import { siteIdentity } from "@/data/siteIdentity";

// Department options array
const departmentOptions = [
  "General Inquiry",
  "Sales",
  "Service",
  "Parts",
  "Finance",
];

const fields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: departmentOptions[0],
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create the object of all form values
    const formData = { ...form };
    console.log("Form Data Object:", formData);
    // You can handle the formData object as needed (e.g., send to API)
  };

  return (
    <>
      <div className="section-container py-10">
        <div className="text-center justify-items-center">
          <div className="max-w-3xl mx-auto">
            <h2>
              Contact Our Store in {siteIdentity.city}, {siteIdentity.state}
            </h2>
            <p className="text-gray-400">
              Contact us at {siteIdentity.siteName} located conveniently in{" "}
              {siteIdentity.city}, {siteIdentity.state}. We are only a short
              drive from Caribou. Serving communities near Edmundston, and
              Frenchville. Call, email or come in to visit us!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          {/* Left: Contact Form */}
          <div>
            <h3 className="mb-1">We Look Forward to Hearing from You!</h3>
            <p className="text-gray-600 mb-4">
              Please note that your information is saved on our server as you
              enter it.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="styleLable">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      className="styleInput"
                      required={field.required}
                      value={form[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                {/* Department Select */}
                <div className="md:col-span-2">
                  <label className="styleLable">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    className="styleInput"
                    required
                    value={form.department}
                    onChange={handleChange}
                  >
                    {departmentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="styleLable">Message</label>
                <textarea
                  name="message"
                  className="styleInput min-h-[100px]"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button className="bg-red-600 text-white px-6 py-2 rounded mt-2">
                Send Message
              </button>
              <p className="text-xs text-gray-500 mt-2">
                By participating, you consent to receive text messages sent by
                an automatic telephone dialing system. Consent to these terms is
                not a condition of purchase.
              </p>
            </form>
          </div>
          {/* Right: Map and Info Card */}
          <div>
            <div className="rounded overflow-hidden mb-4">
              {/* Google Map iframe - add your map here if needed */}
            </div>
            <div className="bg-slate-100 rounded-xl p-0 border border-slate-300 overflow-hidden">
              <div className=" px-6 py-4">
                <h3 className="font-semibold text-center text-lg">Hours</h3>
              </div>
              <div>
                {salesServiceHours.map((item) => (
                  <div
                    key={item.day}
                    className={`flex justify-between px-6 py-3 text-sm ${
                      item.highlight ? "" : ""
                    } ${item.closed ? "" : "border-b border-gray-200"}`}
                  >
                    <span>
                      {item.day === "Mon-Fri"
                        ? "Monday - Friday"
                        : item.day === "Sat"
                        ? "Saturday"
                        : "Sunday"}
                    </span>
                    <span
                      className={
                        item.closed ? "text-red-600 font-semibold" : ""
                      }
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-100 px-6 py-4 border-slate-200">
                <h4 className="font-semibold text-center">Address</h4>
                <p className="text-sm text-center mt-1">
                  {siteIdentity.siteName} {siteIdentity.address},{" "}
                  {siteIdentity.city}, {siteIdentity.state} {siteIdentity.zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
