export default function InputField({ id, label, placeholder, type = "text", centered = false }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl border-2 border-gray-300 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 px-4 py-3 ${centered ? "text-center" : ""}`}
      />
    </div>
  );
}
