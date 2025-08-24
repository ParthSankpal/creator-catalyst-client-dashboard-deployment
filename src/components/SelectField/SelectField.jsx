export default function SelectField({ id, label, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
