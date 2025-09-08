"use client";
import { useState, useEffect } from "react";
import StyledButton from "../actions/buttons/StyledButton";

const aprMatrix = {
  "Under 640": { 36: 8.19, 48: 8.99, 60: 9.89, 72: 10.29, 84: 11.29 },
  "640-699": { 36: 7.19, 48: 7.39, 60: 7.79, 72: 8.19, 84: 8.59 },
  "700-749": { 36: 6.09, 48: 6.59, 60: 6.89, 72: 7.19, 84: 8.09 },
  "Over 750": { 36: 5.89, 48: 5.99, 60: 6.49, 72: 6.79, 84: 7.79 },
};

export default function CalculateInstalmentForm({ title, item }) {
  const vehiclePrice = (item?.price?.sale || item?.price?.msrp || 0);
  const vehicleName =
    `${item?.year ?? ""} ${item?.make ?? ""} ${item?.model ?? ""}`.trim() ||
    "Unknown Vehicle";

  const [creditScore, setCreditScore] = useState("640-699");
  const [loanMonths, setLoanMonths] = useState(84);
  const [downPayment, setDownPayment] = useState(vehiclePrice * 0.1 || 0);
  const [apr, setApr] = useState(aprMatrix["640-699"][84]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

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
            <label className="styleLabel">{field.label} *</label>
            <input
              className="styleInput"
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required
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
      >
        Submit
      </StyledButton>

      {/* Disclaimer */}
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
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    placeholder: "Enter phone number",
  },
];
