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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");

        try {
            // Validate required fields
            if (!form.lastName || !form.email || !form.phone || !form.resume) {
                setSubmitMessage("Please fill in all required fields.");
                setIsSubmitting(false);
                return;
            }

            // Create email content
            const emailPayload = `
New Employment Application - Fortkent Powersports

Applicant Information:
Name: ${form.firstName} ${form.lastName}
Email: ${form.email}
Phone: ${form.phone}

Address:
${form.address || 'Not provided'}
${form.city || ''} ${form.state || ''} ${form.zip || ''}
Country: ${form.country}

Resume: ${form.resume ? form.resume.name : 'No file uploaded'}

Comments:
${form.comments || 'No additional comments'}

Submitted: ${new Date().toLocaleString()}
            `.trim();

            // Prepare data for unified API (email only for employment applications)
            const unifiedApiData = {
                emailPayload: emailPayload,
                subject: `Employment Application - ${form.firstName} ${form.lastName} - Fortkent Powersports`,
                formType: 'Employment Application',
                enableEmail: true,
                enableCrm: false // Employment applications typically don't go to CRM
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
                
                if (result.success) {
                    setSubmitMessage("Your employment application has been submitted successfully! We've received your information and will review your application. We'll contact you soon regarding next steps.");
                } else {
                    setSubmitMessage(result.message || "There was an issue submitting your application. Please try again.");
                }
                
                // Reset form on success
                setForm({
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
            } else {
                const errorResult = await response.json().catch(() => ({}));
                setSubmitMessage(errorResult.message || "There was an error submitting your application. Please try again.");
            }
        } catch (error) {
            console.error("Employment form submission error:", error);
            setSubmitMessage("There was an error submitting your application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
         <div className=" justify-items-center section-container py-10 ">
                <div className="max-w-3xl text-center">

                    <h2>Join The Fort Kent Powersports Team!</h2>
                    <p className="text-gray-400">We can’t wait for you to gain powersports employment and join our team of sales and service professionals. Submit your application and we’ll get back to you as soon as possible. In the meantime, feel free to learn more about us or to contact us for more information. Visit us today to meet with our family directly.</p>
                </div>
        <form className="max-w-3xl mx-auto p-6 bg-white pt-10" onSubmit={handleSubmit}>
            
            {submitMessage && (
                <div className={`p-3 mb-4 rounded ${submitMessage.includes('successfully')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'}`}>
                    {submitMessage}
                </div>
            )}

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
                <StyledButton 
                    type="submit" 
                    size="md" 
                    variant="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </StyledButton>
            </div>
            <p className="mt-4 text-xs text-gray-400 text-left">
                By participating, you consent to receive text messages sent by an automatic telephone dialing system. Consent to these terms is not a condition of purchase
            </p>
        </form>
            </div>
    );
}