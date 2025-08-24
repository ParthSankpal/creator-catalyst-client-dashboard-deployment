export default function CheckboxField({ id, label }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
      />
      <label htmlFor={id} className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </label>
    </div>
  );
}
