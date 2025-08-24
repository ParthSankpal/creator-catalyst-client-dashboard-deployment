"use client";

import Select from "react-select";

export default function SelectField({
  id,
  label,
  options = [],
  defaultValue,
  onChange,
}) {
  // ✅ Convert string options into {value,label}
  const formattedOptions =
    typeof options[0] === "string"
      ? options.map((opt) => ({ value: opt, label: opt }))
      : options;

  const defaultOption = formattedOptions.find(
    (opt) => opt.value === defaultValue || opt.label === defaultValue
  );

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      <Select
        inputId={id}
        instanceId={id || "select-field"}
        options={formattedOptions}
        defaultValue={defaultOption}
        onChange={onChange}
        unstyled // ✅ disables default react-select styles
        classNames={{
          control: ({ isFocused }) =>
            `flex items-center rounded-lg border px-3 py-2 min-h-[2.5rem] cursor-pointer
             ${isFocused ? "border-emerald-500 ring-2 ring-emerald-300" : "border-gray-300 dark:border-gray-600"}
             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`,
          menu: () =>
            "mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-50",
          option: ({ isFocused, isSelected }) =>
            `px-3 py-2 cursor-pointer 
             ${isSelected ? "bg-emerald-600 text-white" : ""}
             ${!isSelected && isFocused ? "bg-emerald-100 dark:bg-emerald-700 dark:text-white" : ""}
             ${!isFocused && !isSelected ? "text-gray-700 dark:text-gray-200" : ""}`,
          placeholder: () => "text-gray-400 dark:text-gray-500",
          singleValue: () => "text-gray-900 dark:text-gray-100",
          input: () => "text-gray-900 dark:text-gray-100",
        }}
      />
    </div>
  );
}
