"use client";

import { useState } from "react";

export default function ToggleSwitch({
  label,
  description,
  defaultChecked = false,
  onChange,
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleChange = () => {
    setEnabled(!enabled);
    if (onChange) onChange(!enabled);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        {description && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </div>
        )}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={enabled}
          onChange={handleChange}
        />
        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
      </label>
    </div>
  );
}
