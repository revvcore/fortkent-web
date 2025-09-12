"use client";
import { useState } from "react";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");

        try {
            // Validate required fields
            if (!form.firstName || !form.lastName || !form.email || !form.phone) {
                setSubmitMessage("Please fill in all required fields.");
                setIsSubmitting(false);
                return;
            }

            // Create email content
            const emailPayload = `
New Test Ride Appointment Request - Fortkent Powersports

Customer Information:
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}

Appointment Details:
Date: ${form.date || 'Not specified'}
Time: ${form.time}

Vehicle Information:
Option: ${form.option || 'Enter Stock Number'}
Stock Number: ${form.stockNumber || 'Not provided'}

Request Type: Schedule Test Ride
Submitted: ${new Date().toLocaleString()}
            `.trim();

            // Prepare data for unified API (both email and CRM)
            const unifiedApiData = {
                // Email data
                emailPayload: emailPayload,
                subject: `Test Ride Request - ${form.firstName} ${form.lastName} - Fortkent Powersports`,
                formType: 'Test Ride Request',
                
                // CRM data
                itemXML: {
                    email: form.email,
                    name: `${form.firstName} ${form.lastName}`,
                    phone: form.phone,
                    vehicleStockNum: form.stockNumber || '',
                    note: `Test ride appointment request for ${form.date || 'unspecified date'} at ${form.time}. Stock: ${form.stockNumber || 'Not specified'}`
                },
                prospectId: `TESTRIDE_${Date.now()}`,
                
                // Enable both email and CRM
                enableEmail: true,
                enableCrm: true
            };

            const response = await fetch('/api/lead-and-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(unifiedApiData)
            });

            if (response.ok) {
                const result = await response.json();
                
                // Check if both operations were successful
                if (result.success) {
                    setSubmitMessage("Your test ride request has been submitted successfully! We've sent your information to our team and added you to our system. We'll contact you soon to confirm your appointment.");
                } else {
                    // Partial success - show what worked and what didn't
                    let message = "Your request was partially processed: ";
                    if (result.results?.email?.success) {
                        message += "Request sent successfully. ";
                    }
                    if (result.results?.crm?.success) {
                        message += "Lead added to our system. ";
                    }
                    if (result.results?.errors?.length > 0) {
                        message += `However, some issues occurred: ${result.results.errors.join(', ')}`;
                    }
                    setSubmitMessage(message);
                }
                
                // Reset form on success
                setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    date: "",
                    time: "09:00 AM",
                    option: "",
                    stockNumber: "",
                });
            } else {
                const errorResult = await response.json().catch(() => ({}));
                setSubmitMessage(errorResult.message || "There was an error submitting your test ride request. Please try again.");
            }
        } catch (error) {
            console.error("Test ride form submission error:", error);
            setSubmitMessage("There was an error submitting your test ride request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
   
       return (
           <div className="max-w-2xl mx-auto section-container  ">
               <p className="text-gray-500 text-center mb-6">
                  Please note that your information is saved on our server as you enter it.
               </p>

               {submitMessage && (
                   <div className={`p-3 mb-4 rounded ${submitMessage.includes('successfully')
                       ? 'bg-green-100 text-green-700'
                       : 'bg-red-100 text-red-700'}`}>
                       {submitMessage}
                   </div>
               )}

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
                   <button 
                       type="submit" 
                       className="bg-red-600 text-white px-6 py-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                       disabled={isSubmitting}
                   >
                       {isSubmitting ? 'Scheduling...' : 'Schedule Test Ride'}
                   </button>
                   <p className="text-xs text-gray-500 mt-2">
                      By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase.
                   </p>
               </form>
           </div>
       );
}