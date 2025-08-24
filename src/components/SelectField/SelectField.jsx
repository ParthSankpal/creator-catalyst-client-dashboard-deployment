"use client";

import Select from "react-select";

export default function SelectField({
  id,
  label,
  options = [],
  defaultValue,
  onChange,
}) {
  // ✅ Only format if it's a string array
  const formattedOptions =
    typeof options[0] === "string"
      ? options.map((opt) => ({ value: opt, label: opt }))
      : options;

  const defaultOption = formattedOptions.find(
    (opt) =>
      opt.value === defaultValue || opt.label === defaultValue // works for both
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <Select
        id={id}
  instanceId={id || "select-field"}
        options={formattedOptions}
        defaultValue={defaultOption}
        onChange={onChange}
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#10b981" : "#d1d5db", 
            boxShadow: state.isFocused ? "0 0 0 1px #10b981" : "none",
            "&:hover": { borderColor: "#10b981" },
          }),
        }}
      />
    </div>
  );
}
