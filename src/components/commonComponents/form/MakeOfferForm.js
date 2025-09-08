import StyledButton from "../actions/buttons/StyledButton";

export default function GetEPriceForm({ title, item }) {
  const vehicleName =
    `${item.year} ${item.make} ${item.model}` || "Unknown Vehicle";
  return (
    <div>
      <div className="text-start">
        <p className="text-xl tracking-tight font-bold">
          {title} for {vehicleName}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Submit the form below, and our representative will be in touch
          shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="styleLabel">{field.label}</label>
            <input
              className="styleInput"
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <StyledButton
        className="my-4 w-full"
        variant="primary"
        size="md"
        onClick={() => setOpenFormModal(false)}
      >
        Make Offer
      </StyledButton>
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
