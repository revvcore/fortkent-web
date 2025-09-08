"use client"
import { useState } from "react";

const agreementText = ({ firstName, lastName, email, phone }) => `By filling out and signing this Application for Credit (Application) you are agreeing to allow Fort Kent Powersports (The Dealer) to apply for credit, insurance and warranty products on your behalf. This Application is for use with Fort Kent Powersports and its Lenders (The Lenders), only.\n\nBy signing, you agree to the following statement:\n\nI authorize Fort Kent Powersports, on my behalf, to submit information from this Application to The Lenders on my behalf. I certify to The Lenders to every policy, rule, or agreement adopted or enforced by the Lenders and to any policies, rules, or agreements which may be included in the contract to applications as part of the Lenders' application process. I have read this Application and everything stated in it is true to the best of my ability.\n\nName: ${firstName || "__________"} ${lastName || "__________"}\nEmail: ${email || "__________"}\nPhone: ${phone || "__________"}`;

export default function AgreementForm() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    email: "",
    phone: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-center font-semibold text-gray-700 mb-2">Fort Kent Powersports</h2>
      <div className="flex justify-center mb-2">
        <img src="/images/logo/logo-fort.webp" alt="Fort Kent Powersports" className="h-12" />
      </div>
      <h3 className="text-center text-lg font-semibold mb-4">Hi there! Tell us a bit about you.</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input type="text" name="firstName" placeholder="First Name *" className="w-full border-0 border-b border-gray-400 focus:border-blue-700 focus:ring-0 px-0 py-2 bg-transparent" value={form.firstName} onChange={handleChange} required />
          </div>
          <div>
            <input type="text" name="middleName" placeholder="Middle Name" className="w-full border-0 border-b border-gray-400 focus:border-blue-700 focus:ring-0 px-0 py-2 bg-transparent" value={form.middleName} onChange={handleChange} />
          </div>
          <div>
            <input type="text" name="lastName" placeholder="Last Name *" className="w-full border-0 border-b border-gray-400 focus:border-blue-700 focus:ring-0 px-0 py-2 bg-transparent" value={form.lastName} onChange={handleChange} required />
          </div>
          <div>
            <select name="suffix" className="w-full border-0 border-b border-gray-400 focus:border-blue-700 focus:ring-0 px-0 py-2 bg-transparent appearance-none">
              <option value="">Suffix</option>
              <option value="Jr">Jr</option>
              <option value="Sr">Sr</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>
          <div>
            <input type="email" name="email" placeholder="Email Address *" className="w-full border-0 border-b border-gray-400 focus:border-blue-700 focus:ring-0 px-0 py-2 bg-transparent" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <input type="tel" name="phone" placeholder="Phone Number *" className="w-full border-0 border-b border-gray-400 focus:border-blue-700 focus:ring-0 px-0 py-2 bg-transparent" value={form.phone} onChange={handleChange} required />
          </div>
        </div>
        <div className="my-4">
          <textarea
            className="w-full border rounded px-3 py-2 text-xs bg-gray-50 h-40 resize-none"
            value={agreementText(form)}
            readOnly
          />
          <div className="text-xs text-center mt-2">
            <a href="#" className="text-blue-600 underline">Disaster Policy</a>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-2">
          By checking the box below and clicking I agree to the terms as disclosed above/Next, you are declaring that you have read, acquire, and understand the following: Privacy Policy, Bank Privacy Policy, Credit Reporting and FCRA Notices, Equal Credit Opportunity Act, Risk-Based Pricing, and Additional Lender Disclosures.
        </div>
        <div className="flex items-center mb-2">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="mr-2" required />
          <label className="text-sm">I agree to the terms as disclosed above*</label>
        </div>
        <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded font-semibold mt-2" disabled={!form.agree}>
          Next
        </button>
      </form>
    </div>
  );
}
