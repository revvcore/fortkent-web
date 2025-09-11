"use client"
import { useState } from "react";

const agreementText = ({ firstName, lastName, email, phone }) => `By filling out and signing this Application for Credit ("Application"), you are agreeing to allow The Dealer ("Dealer") to apply for credit, insurance and warranty products on your behalf. This Application is for use with Fort Kent Powersports and their Lenders ("The Lenders").

Additionally, by signing, you agree to the following statement:

I authorize Fort Kent Powersports, as my agent, to: (i) submit information from this Application to The Lenders on my behalf; (ii) certify to The Lenders the accuracy of the information; and (iii) convey to The Lenders my consent to any policies, notices, agreements or other terms disclosed by The Lenders to applicants as part of The Lenders’ application process. I have read this Application and everything stated in it is true to the best of my ability. I authorize The Lenders to check my credit, employment history, or any other information, and to report such information, and its credit experience with me, to others. I am at least 18 years of age. Alimony, child support or separate maintenance income need not be revealed if you do not wish to have it considered as a basis for repaying this obligation.

I hereby certify that the property purchased pursuant to this application is for my personal and/or business use; that I am fully responsible for making all payments for such property; that such property will be in my possession or under my control until the amount financed and all finance charges have been paid in full; and that I am not purchasing any property financed through The Lenders for the benefit or use of another without the prior written approval of The Lenders.

IMPORTANT INFORMATION ABOUT ACCOUNT OPENING PROCEDURES: Federal law requires all financial institutions to obtain, verify, and record information that identifies each person who requests to open an account prior to account opening.

WHAT THIS MEANS TO YOU: When you apply for credit, we will ask for your name, address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver's license or other identifying documents. Failure to provide the required information may result in denial of your request to open an account.`;

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
    <div className="max-w-lg mx-auto bg-white rounded-xl  p-6 mt-6">
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
            <a href="#" className="text-blue-600 underline">Privacy Policy</a>
          </div>
        </div>
        <div className="text-xs text-gray-700 mb-2 text-center">
          By checking the below box entitled "I agree to the terms as disclosed above", clicking “Next” and completing the following Application, you agree that you have read, agree to and understand the following,
          <a href="#" className="underline text-blue-700 mx-1">General Application Disclosures</a>,
          <a href="#" className="underline text-blue-700 mx-1">E-Sign Act Disclosures</a>,
          Octane Lending, Inc.’s <a href="#" className="underline text-blue-700 mx-1">Privacy Policy</a>,
          Fort Kent Powersports <a href="#" className="underline text-blue-700 mx-1">Privacy Policy</a> and
          <a href="#" className="underline text-blue-700 mx-1">Terms and Conditions</a>,
          <a href="#" className="underline text-blue-700 mx-1">COPPA Disclosures</a>, and
          <a href="#" className="underline text-blue-700 mx-1">Alternate Lenders Disclosures</a>.
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
