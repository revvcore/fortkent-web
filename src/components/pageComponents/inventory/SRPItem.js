"use client";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";
import { siteIdentity } from "@/data/siteIdentity";
import FormModal from "./FormModal";
import { useState } from "react";
export default function SRPItem({ item }) {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const vehicleName =
    `${item.year} ${item.make} ${item.model}` || "Unknown Vehicle";

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  // Calculate estimated monthly installment
  const principal = (item?.price?.sale || item?.price?.msrp || 0) - 1000;
  const annualRate = 0.064;
  const months = 84;
  const monthlyRate = annualRate / 12;
  const estimatedMonthly =
    principal > 0
      ? (
          (principal * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -months))
        ).toFixed(2)
      : null;
  const estMonthlyInst = currencyFormatter.format(estimatedMonthly) || null;
  const msrp = currencyFormatter.format(item?.price?.msrp) || null;
  const sale = currencyFormatter.format(item?.price?.sale) || null;
  const showSavings = msrp && sale && msrp > sale;

  const saving = showSavings
    ? currencyFormatter.format(item?.price?.msrp - item?.price?.sale)
    : null;

  return (
    <div className="border p-4 flex flex-col gap-2 border-slate-300 rounded-lg hover:shadow-lg transition-all">
      <div className="relative bg-slate-100">
        <img
          src={
            item?.media?.imgFeatured?.url || "/images/fkps-still-in-crate.webp"
          }
          alt={vehicleName}
          className="w-full h-[200px] object-contain"
        />
        {showSavings ? (
          <div className="absolute mx-auto text-center text-sm font-bold top-0 px-3 py-1 rounded-full bg-green-500 text-white">
            🎉 SAVE {saving}
          </div>
        ) : null}
      </div>
      <div className="flex-1">
        <h3 className="font-bold">{vehicleName}</h3>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-1/2 text-sm font-bold pb-1">Retail Price:</td>
              <td className="w-1/2 text-sm text-right pb-1">{msrp}</td>
            </tr>
            {showSavings ? (
              <>
                <tr>
                  <td className="w-1/2 text-sm font-bold pb-1">Sale Price:</td>
                  <td className="w-1/2 text-sm text-right pb-1">
                    <span className="text-sm text-red-500 font-semibold">
                      {sale}
                    </span>
                  </td>
                </tr>
                {/* <tr>
                  <td className="w-1/2 text-sm font-bold pb-1">Savings:</td>
                  <td className="w-1/2 text-sm text-right pb-1">
                    <span className="text-sm text-red-500 font-semibold">
                      {saving}
                    </span>
                  </td>
                </tr> */}
              </>
            ) : null}
            <tr>
              <td className="w-1/2 text-sm font-bold pb-1">VIN:</td>
              <td className="w-1/2 text-sm text-right pb-1">
                {item?.vin || "Unknown"}
              </td>
            </tr>
            {item?.specifications?.color?.exterior ? (
              <tr>
                <td className="w-1/2 text-sm font-bold pb-1">Color:</td>
                <td className="w-1/2 text-sm text-right pb-1">
                  {item?.specifications?.color?.exterior || "Unknown"}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="space-y-2 mt-2">
        <StyledButton
          href={`/inventory/${item.slug}`}
          variant="success"
          className="w-full"
          size="md"
          onClick={() => {
            setOpenFormModal(true), setFormTitle("E-Price");
          }}
        >
          Est. <b>{estMonthlyInst}</b>/mo.
        </StyledButton>
        <StyledButton
          href={`/inventory/${item.slug}`}
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => {
            setOpenFormModal(true), setFormTitle("E-Price");
          }}
        >
          Get E-Price
        </StyledButton>
        <StyledButton
          href={`/inventory/${item.slug}`}
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => {
            setOpenFormModal(true), setFormTitle("Pre-Approved");
          }}
        >
          Get Pre-Approved
        </StyledButton>
        <StyledButton
          href={`/inventory/${item.slug}`}
          variant="outline"
          className="w-full"
          size="sm"
        >
          Full Details
        </StyledButton>
        <p className="text-sm text-center text-gray-500">
          or Call{" "}
          <a
            href={`tel:+1${siteIdentity.phoneSale.replace(/\D/g, "")}`}
            className="font-bold"
          >
            {siteIdentity.phoneSale}
          </a>
        </p>
      </div>
      <FormModal isOpen={openFormModal} onClose={() => setOpenFormModal(false)}>
        <div className="bg-white rounded p-4 max-w-lg w-full">
          <div className="text-start">
            <p className="text-xl tracking-tight font-bold">
              Get {formTitle} for {vehicleName}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Submit the form below, and our representative will be in touch
              shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="styleLabel">
                  {field.label}
                </label>
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
            Submit
          </StyledButton>
          <p className="text-xs text-gray-500 mt-2">
            By participating, you consent to receive text messages sent by an
            automatic telephone dialing system. Consent to these terms is not a
            condition of purchase.
          </p>
        </div>
      </FormModal>
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
