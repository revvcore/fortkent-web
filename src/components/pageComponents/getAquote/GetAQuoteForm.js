"use client";
import { useState } from "react";

export default function GetAQuoteForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        stockNumber: "",
        additionalInfo: "",
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
                   </div>
                   <div>
                       <label className="styleLable">Additional Information</label>
                       <input type="text" name="stockNumber" className="styleInput" placeholder="Enter vehicle stock number" value={form.stockNumber} onChange={handleChange} />
                   </div>
                   <div>
                       <label className="styleLable">Additional Information</label>
                       <textarea name="additionalInfo" className="styleInput" placeholder="Enter additional information" rows={5} value={form.additionalInfo} onChange={handleChange} />
                   </div>
                   <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-2">Get My Quote</button>
               </form>
           </div>
       );
}