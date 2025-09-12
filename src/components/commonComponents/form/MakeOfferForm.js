import { useState } from "react";
import StyledButton from "../actions/buttons/StyledButton";

export default function MakeOfferForm({ title, item, setOpenFormModal }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    offer: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const vehicleName =
    `${item.year} ${item.make} ${item.model}` || "Unknown Vehicle";

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

      // Handle price formatting - check if price is an object or string
      let formattedPrice = 'Price not available';
      if (item.price) {
        if (typeof item.price === 'object') {
          // If price is an object, try to get common price properties
          formattedPrice = item.price.retail ||
            item.price.msrp ||
            item.price.selling ||
            item.price.price ||
            item.price.amount ||
            JSON.stringify(item.price);
        } else {
          formattedPrice = item.price;
        }
      }

      const emailPayload = `
New Make Offer | Fortkent Powersports

Vehicle: ${vehicleName}
${item.stock ? `Stock #: ${item.stock}` : ''}
${item.vin ? `VIN: ${item.vin}` : ''}
Listed Price: $${formattedPrice}

Customer Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Offer Amount: $${formData.offer}

Request Type: Make Offer
Submitted: ${new Date().toLocaleString()}
      `.trim();

      // Prepare data for unified API (both email and CRM)
      const unifiedApiData = {
        // Email data
        emailPayload: emailPayload,
        subject: `Make Offer Request - ${vehicleName} - Offer: $${formData.offer} - Fortkent Powersports`,
        formType: 'Make Offer',
        
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
          note: `Make Offer request for ${vehicleName}. Customer offer: $${formData.offer}`
        },
        prospectId: `OFFER_${Date.now()}`,
        
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
          setSubmitMessage("Your offer has been submitted successfully! We've sent your information to our team and added you to our CRM system. We'll review your offer and get back to you soon.");
        } else {
          // Partial success - show what worked and what didn't
          let message = "Your offer was partially processed: ";
          if (result.results?.email?.success) {
            message += "Offer sent successfully. ";
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
          offer: "",
        });
        setTimeout(() => {
          if (setOpenFormModal) setOpenFormModal(false);
        }, 3000);
      } else {
        const errorResult = await response.json().catch(() => ({}));
        setSubmitMessage(errorResult.message || "There was an error submitting your offer. Please try again.");
      }
    } catch (error) {
      console.error("Make offer form submission error:", error);
      setSubmitMessage("There was an error submitting your offer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="text-start">
        <p className="text-xl tracking-tight font-bold">
          {title} for {vehicleName}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Submit your offer below, and our representative will be in touch
          shortly to discuss your proposal.
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
                min={field.type === 'number' ? '1' : undefined}
              />
            </div>
          ))}
        </div>
        <StyledButton
          className="my-4 w-full"
          variant="primary"
          size="md"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Offer...' : 'Make Offer'}
        </StyledButton>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        By participating, you consent to receive text messages sent by an
        automatic telephone dialing system. Consent to these terms is not a
        condition of purchase.
      </p>
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
  {
    label: "Your Offer (in USD)",
    name: "offer",
    type: "number",
    placeholder: "Enter your offer",
    required: true,
  },
];
