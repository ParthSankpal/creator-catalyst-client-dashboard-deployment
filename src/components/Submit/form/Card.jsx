export default function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/30 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
