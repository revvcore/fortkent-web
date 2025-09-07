"use client";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";
import { siteIdentity } from "@/data/siteIdentity";
import FormModal from "../FormModal";
import { useState } from "react";
import Link from "next/link";
import GetEPriceForm from "@/components/commonComponents/form/GetEPriceForm";
import CalculateInstalmentForm from "@/components/commonComponents/form/CalculateInstalmentForm";
import { Bike, DollarSign, PhoneCall } from "lucide-react";
export default function ActionsTab({ item }) {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");

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
    <div>
      <div className="">
        {showSavings ? (
          <div className="mx-auto text-center mb-4">
            <p className="text-2xl font-black animate-pulse">
              🎉 <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-500 to-cyan-500">SAVE {saving}</span>
            </p>
          </div>
        ) : null}
      </div>
      <div className="p-4 flex flex-col gap-2 bg-slate-50 border border-slate-200 rounded">
        <div className="flex-1">
          {/* <h3 className="font-bold">{vehicleName}</h3> */}
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="w-1/2 text-sm  pb-1">Retail Price:</td>
                <td className="w-1/2 font-bold text-right pb-1">{msrp}</td>
              </tr>
              {showSavings ? (
                <>
                  <tr>
                    <td className="w-1/2 text-sm  pb-1">Sale Price:</td>
                    <td className="w-1/2 font-bold  text-right pb-1">
                      <span className=" text-red-500 font-semibold">
                        {sale}
                      </span>
                    </td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col border border-slate-300 rounded bg-white">
          <div className="p-2 text-center">
            <p>Est. Payment</p>
            <p className="text-2xl font-bold text-gray-900 -mt-1">
              <b>{estMonthlyInst}</b>/mo.
            </p>
          </div>
          <div className="p-2 border-t border-slate-300">
            <p className="text-center text-primary-500 text-sm font-semibold">
              Personalize Payment
            </p>
          </div>
        </div>
        <div className="space-y-2 mt-2">
          <StyledButton
            variant="success"
            className="w-full"
            size="md"
            onClick={() => {
              setOpenFormModal(true), setFormTitle("E-Price");
            }}
          >
            Get E-Price
          </StyledButton>
          <StyledButton
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => {
              setOpenFormModal(true), setFormTitle("Incentive");
            }}
          >
            Get Incentive
          </StyledButton>
          <StyledButton
            variant="outline"
            className="w-full"
            size="sm"
            onClick={() => {
              setOpenFormModal(true), setFormTitle("Incentive");
            }}
          >
            Make Offer
          </StyledButton>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <button className="flex flex-col justify-center items-center text-center px-2 md:py-4 aspect-square border border-slate-300 rounded bg-white hover:bg-slate-50/50 hover:text-gray-700 text-gray-400 cursor-pointer">
              <DollarSign className="w-5 h-5" />
              <p className="text-xs md:text-sm tracking-tight mt-1">Value Your Trade</p>
            </button>
            <button className="flex flex-col justify-center items-center text-center px-2 md:py-4 aspect-square border border-slate-300 rounded bg-white hover:bg-slate-50/50 hover:text-gray-700 text-gray-400 cursor-pointer">
              <Bike className="w-5 h-5" />
               <p className="text-xs md:text-sm  tracking-tight mt-1">Schedule a Test Ride</p>
            </button>
            <button className="flex flex-col justify-center items-center text-center px-2 md:py-4 aspect-square border border-slate-300 rounded bg-white hover:bg-slate-50/50 hover:text-gray-700 text-gray-400 cursor-pointer">
              <PhoneCall className="w-5 h-5" />
              <p className="text-xs md:text-sm  tracking-tight mt-1">Click to Call</p>
            </button>
          </div>
        </div>
        <FormModal
          isOpen={openFormModal}
          onClose={() => setOpenFormModal(false)}
        >
          <div className="bg-white rounded p-4 max-w-lg w-full">
            <CalculateInstalmentForm title={formTitle} item={item} />
            {/* <GetEPriceForm title={formTitle} item={item} /> */}
          </div>
        </FormModal>
      </div>
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
