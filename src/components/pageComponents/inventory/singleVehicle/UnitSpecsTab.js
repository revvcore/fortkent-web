export default function UnitSpecsTab({ item }) {
  const row = (spec, value) => (
    <tr className="w-full border border-slate-300 hover:bg-slate-50 bg-white">
      <td className="w-1/2 py-2 px-2 md:px-4 text-sm md:text-base font-semibold text-gray-500">
        {spec}
      </td>
      <td className="w-1/2 py-2 px-2 md:px-4">{value}</td>
    </tr>
  );

  return (
    <div>
      <h2>Unit Specifications</h2>
      <table className="border w-full">
        <tbody>
          {row("VIN", item.vin || "")}
          {row("Stock Number", item.stockNumber || "")}
          {row("Year", item.year || "")}
          {row("Make", item.make || "")}
          {row("Model", item.model || "")}
          {row("Trim", item.trim || "")}
          {row("Class", item.class || "")}
          {row("Body Style", item.bodyType || "")}
          {row("Color", item?.specifications?.color?.exterior || "")}
          {row(
            "Engine",
            `${item?.specifications?.engine?.name || ""} ${
              item?.specifications?.engine?.type || ""
            }`
          )}
          {row(
            "Displacement (cc)",
            item?.specifications?.engine?.displacement || ""
          )}
          {row("Power Cycle", item?.specifications?.engine?.powerCycle || "")}
          {row("Cylinders", item?.specifications?.engine?.cylinders || "")}
          {row("Fuel", item?.specifications?.engine?.fuel || "")}
        </tbody>
      </table>
    </div>
  );
}
