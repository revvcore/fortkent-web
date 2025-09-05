"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import SearchableSelect from "@/components/commonComponents/form/SearchableSelect";
import StyledButton from "@/components/commonComponents/actions/buttons/StyledButton";

export default function Filters({ options }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilters = {
    make: searchParams.get("make") || "",
    year: searchParams.get("year") || "",
    model: searchParams.get("model") || "",
    trim: searchParams.get("trim") || "",
    condition: searchParams.get("condition") || "",
    color: searchParams.get("color") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [resetting, setResetting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      make: "",
      year: "",
      model: "",
      trim: "",
      condition: "",
      color: "",
      type: "",
      minPrice: "",
      maxPrice: "",
    });
    setResetting(true);
    router.replace("?"); // clear query params
  };

  useEffect(() => {
    if (resetting) {
      setResetting(false); // skip effect once after reset
      return;
    }

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value);
      }
    });

    if ([...params.keys()].length > 0) {
      params.set("p", "1"); // reset pagination when filters change
      router.replace(`?${params.toString()}`);
    } else {
      router.replace("?");
    }
  }, [filters, router, resetting]);

  const renderSelect = (name, label, opts) => (
    <>
      <SearchableSelect
        label={label}
        name={name}
        value={filters[name]}
        options={opts}
        onChange={handleChange}
        placeholder={`Select ${label}`}
      />
      {/* <select
        name={name}
        value={filters[name]}
        onChange={handleChange}
        className="p-2 border rounded"
      >
        <option value="">{`Select ${label}`}</option>
        {opts.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select> */}
    </>
  );

  return (
    <div className="w-full p-4 bg-gray-50 rounded space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {renderSelect("make", "Make", options.make)}
        {renderSelect("year", "Year", options.year)}
        {renderSelect("model", "Model", options.model)}
        {renderSelect("trim", "Trim", options.trim)}
        {renderSelect("condition", "Condition", options.condition)}
        {renderSelect("color", "Color", options.color)}
        {renderSelect("type", "Type", options.type)}

        {/* Price Range */}
        {/* <div className="">
          <label className="styleLabel">Select Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleChange}
              className="styleInput"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleChange}
              className="styleInput"
            />
          </div>
        </div> */}
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <StyledButton onClick={resetFilters} variant="error" size="sm">
          Reset All Filters
        </StyledButton>
      </div>
    </div>
  );
}
