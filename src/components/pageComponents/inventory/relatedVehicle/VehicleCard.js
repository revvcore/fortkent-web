"use client";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";
import { generateInventorySlug } from "@/lib/GenerateInventorySlug";
import Link from "next/link";
export default function VehicleCard({ item }) {
  const slug = generateInventorySlug(item);
  const vehicleName =
    `${item.year} ${item.make} ${item.model} ${item.trim} ${item.class} ${item.conditionType} ${item?.specifications?.color?.exterior}` ||
    "Unknown Vehicle";
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
    <div className="flex-1 border p-4 flex flex-col gap-2 border-slate-300 rounded-lg hover:shadow-lg transition-all bg-white">
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
        <h3 className="font-bold line-clamp-2">{vehicleName}</h3>
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
              </>
            ) : null}
            {/* <tr>
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
            ) : null} */}
          </tbody>
        </table>
      </div>
      <div className="space-y-2 mt-2">
  <Link href={`/vehicle/${slug}`} prefetch={true}>
          <StyledButton variant="outline" className="w-full" size="sm">
            Full Details
          </StyledButton>
        </Link>
      </div>
    </div>
  );
}
