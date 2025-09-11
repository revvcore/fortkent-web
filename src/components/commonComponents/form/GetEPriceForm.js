import { useState } from "react";
import StyledButton from "../actions/buttons/StyledButton";

export default function GetEPriceForm({ title, item, setOpenFormModal }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
New ${title} Request

Vehicle: ${vehicleName}
${item.stock ? `Stock #: ${item.stock}` : ''}
${item.vin ? `VIN: ${item.vin}` : ''}
Price: $${formattedPrice}

Customer Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Request Type: ${title}
Submitted: ${new Date().toLocaleString()}
      `.trim();

      const emailData = {
        toEmail: 'developers@i1smartmarketing.com',
        subject: `${title} Request - ${vehicleName}`,
        payload: emailPayload,
        formType: title
      };
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setSubmitMessage("Your request has been submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        setTimeout(() => {
          if (setOpenFormModal) setOpenFormModal(false);
        }, 2000);
      } else {
        setSubmitMessage("There was an error submitting your request. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="text-start">
        <p className="text-xl tracking-tight font-bold">
          Get {title} for {vehicleName}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Submit the form below, and our representative will be in touch
          shortly.
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
          {isSubmitting ? 'Submitting...' : `Get ${title}`}
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
];
