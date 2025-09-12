"use client";
import { useState } from "react";

export default function ScheduleTestRideForm(){
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: "09:00 AM",
        option: "",
        stockNumber: "",
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
                  Please note that your information is saved on our server as you enter it.
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
                           <label className="styleLable">Select Date</label>
                           <input type="date" name="date" className="styleInput" value={form.date || ''} onChange={handleChange} />
                       </div>
                       <div>
                           <label className="styleLable">Select Time</label>
                           <select name="time" className="styleInput" value={form.time || '09:00 AM'} onChange={handleChange}>
                               <option value="09:00 AM">09:00 AM</option>
                               <option value="10:00 AM">10:00 AM</option>
                               <option value="11:00 AM">11:00 AM</option>
                               <option value="12:00 PM">12:00 PM</option>
                               <option value="01:00 PM">01:00 PM</option>
                               <option value="02:00 PM">02:00 PM</option>
                               <option value="03:00 PM">03:00 PM</option>
                               <option value="04:00 PM">04:00 PM</option>
                           </select>
                       </div>
                   </div>
                   <div>
                       <label className="styleLable">Do you have a unit in mind?</label>
                       <p className="text-xs text-gray-500 mb-2">You may enter your unit information here by selecting from the drop-down menu. If you are unsure of what unit you would like to test drive, you can describe what you are looking for by choosing Vehicle Information.</p>
                   </div>
                   <div>
                       <label className="styleLable">Select option</label>
                       <select name="option" className="styleInput" value={form.option || ''} onChange={handleChange}>
                           <option value="">Enter Stock Number</option>
                           <option value="vehicle">Vehicle Information</option>
                       </select>
                   </div>
                   <div>
                       <label className="styleLable">Stock Number</label>
                       <input type="text" name="stockNumber" className="styleInput" value={form.stockNumber || ''} onChange={handleChange} />
                   </div>
                   <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded mt-2">Schedule Test Ride</button>
                   <p className="text-xs text-gray-500 mt-2">
                      By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase.
                   </p>
               </form>
           </div>
       );
}