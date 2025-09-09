"use client";
import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Transition,
} from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";

export default function SearchableSelect({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = "Select...",
}) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(query.toLowerCase())
        );

  const handleClear = () => {
    onChange({ target: { name, value: "" } });
    setQuery("");
  };

  return (
    <div className="w-full">
      {label && <label className="styleLabel">{label}</label>}

      <Combobox
        value={value}
        onChange={(val) => onChange({ target: { name, value: val } })}
      >
        <div className="relative">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-red-500 cursor-pointer absolute top-1.5 right-6 z-10"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <ComboboxButton className="cursor-pointer w-full">
            <div className="relative w-full cursor-default overflow-hidden rounded border border-slate-400 bg-white text-left shadow-sm focus:outline-gray-500 sm:text-sm">
              <ComboboxInput
                className="w-full border-none py-2 pl-3 leading-5 text-gray-900 focus:ring-0"
                displayValue={(opt) => opt}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </ComboboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-slate-600 bg-white ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-500">
                  No results found
                </div>
              ) : (
                filteredOptions?.map((opt) => (
                  <ComboboxOption
                    key={opt}
                    className={({ focus }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        focus ? "bg-slate-100" : "text-gray-900"
                      }`
                    }
                    value={opt}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {opt}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
