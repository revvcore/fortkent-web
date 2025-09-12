"use client";
import { useState, useEffect } from "react";
import StyledButton from "../actions/buttons/StyledButton";

const aprMatrix = {
  "Under 640": { 36: 8.19, 48: 8.99, 60: 9.89, 72: 10.29, 84: 11.29 },
  "640-699": { 36: 7.19, 48: 7.39, 60: 7.79, 72: 8.19, 84: 8.59 },
  "700-749": { 36: 6.09, 48: 6.59, 60: 6.89, 72: 7.19, 84: 8.09 },
  "Over 750": { 36: 5.89, 48: 5.99, 60: 6.49, 72: 6.79, 84: 7.79 },
};

export default function CalculateInstalmentForm({ title, item, setOpenFormModal }) {
  const vehiclePrice = (item?.price?.sale || item?.price?.msrp || 0);
  const vehicleName =
    `${item?.year ?? ""} ${item?.make ?? ""} ${item?.model ?? ""}`.trim() ||
    "Unknown Vehicle";

  const [creditScore, setCreditScore] = useState("640-699");
  const [loanMonths, setLoanMonths] = useState(84);
  const [downPayment, setDownPayment] = useState(vehiclePrice * 0.1 || 0);
  const [apr, setApr] = useState(aprMatrix["640-699"][84]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Calculate APR when score/month changes
  useEffect(() => {
    if (aprMatrix[creditScore] && aprMatrix[creditScore][loanMonths]) {
      setApr(aprMatrix[creditScore][loanMonths]);
    }
  }, [creditScore, loanMonths]);

  // Calculate monthly payment
  useEffect(() => {
    const principal = vehiclePrice - downPayment;
    const monthlyRate = apr / 100 / 12;
    let payment = 0;

    if (monthlyRate === 0) {
      payment = principal / loanMonths;
    } else {
      payment =
        (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -loanMonths));
    }

    setMonthlyPayment(payment);
  }, [vehiclePrice, downPayment, apr, loanMonths]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const requiredFields = formFields.filter(field => field.required);
      const missingFields = requiredFields.filter(field => !formData[field.name]);

      if (missingFields.length > 0) {
        setSubmitMessage("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Handle price formatting
      let formattedPrice = 'Price not available';
      if (vehiclePrice) {
        formattedPrice = vehiclePrice.toString();
      }

      const emailPayload = `
New Payment Calculator & Financing Inquiry

Vehicle: ${vehicleName}
${item.stock ? `Stock #: ${item.stock}` : ''}
${item.vin ? `VIN: ${item.vin}` : ''}
Vehicle Price: $${formattedPrice}

Financing Details:
Credit Score Range: ${creditScore}
Loan Term: ${loanMonths} months
Down Payment: $${downPayment.toFixed(2)}
APR: ${apr.toFixed(2)}%
Calculated Monthly Payment: $${monthlyPayment.toFixed(2)}

Customer Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Request Type: Payment Calculator & Financing Inquiry
Submitted: ${new Date().toLocaleString()}
      `.trim();

      // Prepare data for unified API (both email and CRM)
      const unifiedApiData = {
        // Email data
        emailPayload: emailPayload,
        subject: `Payment Calculator & Financing Inquiry - ${vehicleName} - Fortkent Powersports`,
        formType: 'Payment Calculator',
        
        // CRM data
        itemXML: {
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          vehicleMake: item.make || '',
          vehicleModel: item.model || '',
          vehicleYear: item.year || '',
          vehicleVIN: item.vin || '',
          vehicleStockNum: item.stock || '',
          vehicleColor: item.specifications?.color?.exterior || '',
          vehiclePrice: formattedPrice,
          note: `Payment Calculator inquiry - Credit: ${creditScore}, Term: ${loanMonths}mo, Down: $${downPayment.toFixed(2)}, Payment: $${monthlyPayment.toFixed(2)}/mo`
        },
        prospectId: `FINANCE_${Date.now()}`,
        
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
          setSubmitMessage("Your financing inquiry has been submitted successfully! We've calculated your payment and sent your information to our finance team. We'll contact you soon to discuss financing options.");
        } else {
          // Partial success - show what worked and what didn't
          let message = "Your inquiry was partially processed: ";
          if (result.results?.email?.success) {
            message += "Information sent successfully. ";
          }
          if (result.results?.crm?.success) {
            message += "Lead added to our system. ";
          }
          if (result.results?.errors?.length > 0) {
            message += `However, some issues occurred: ${result.results.errors.join(', ')}`;
          }
          setSubmitMessage(message);
        }
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        setTimeout(() => {
          if (setOpenFormModal) setOpenFormModal(false);
        }, 3000);
      } else {
        const errorResult = await response.json().catch(() => ({}));
        setSubmitMessage(errorResult.message || "There was an error submitting your financing inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Payment calculator form submission error:", error);
      setSubmitMessage("There was an error submitting your financing inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header with dynamic payment */}
      <div className="text-center mb-6">
        <p className="text-lg font-medium">
          Personalize Payment for {vehicleName}
        </p>
        <p className="text-3xl font-bold text-red-600">
          ${monthlyPayment.toFixed(2)}
          <span className="text-base font-normal">/month</span>
        </p>
        <p className="text-sm text-gray-600">
          Est. payment for {loanMonths} months at {apr.toFixed(2)}% APR
        </p>
      </div>

      {submitMessage && (
        <div className={`p-3 mb-4 rounded ${submitMessage.includes('successfully')
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'}`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Credit Score */}
        <div className="mb-4">
          <label className="styleLabel">Your Credit Score *</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            {Object.keys(aprMatrix).map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => setCreditScore(score)}
                className={`border rounded py-2 text-sm ${
                  creditScore === score
                    ? "bg-red-600 text-white border-red-600"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        {/* Loan Months + Vehicle Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="styleLabel">Select Loan Months *</label>
            <select
              className="styleInput"
              value={loanMonths}
              onChange={(e) => setLoanMonths(Number(e.target.value))}
            >
              {[36, 48, 60, 72, 84].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="styleLabel">Vehicle Price:</label>
            <input
              className="styleInput"
              type="number"
              value={vehiclePrice}
              disabled
            />
          </div>
        </div>

        {/* Down Payment */}
        <div className="mb-4">
          <label className="styleLabel">Select Down-payment Amount *</label>
          <input
            className="styleInput"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>

        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label className="styleLabel">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                className="styleInput"
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <StyledButton
          className="my-6 w-full"
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Financing Inquiry'}
        </StyledButton>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-2">
          By participating, you consent to receive text messages sent by an
          automatic telephone dialing system. Consent to these terms is not a
          condition of purchase.
        </p>
      </form>
    </div>
  );
}

const formFields = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "Enter first name",
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Enter last name",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter email address",
    required: true,
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    placeholder: "Enter phone number",
    required: true,
  },
];
