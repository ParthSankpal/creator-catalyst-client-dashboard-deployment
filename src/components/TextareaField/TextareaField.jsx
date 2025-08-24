export default function TextareaField({ id, label, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        rows="3"
        placeholder={placeholder}
        className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
      ></textarea>
    </div>
  );
}
