export function formatIndianDate(date) {
  if (!date) return "";

  const d = new Date(date);

  // Check if the input has a time component
  const hasTime =
    typeof date === "string"
      ? date.includes("T") || date.includes(":")
      : true; // assume Date object has time

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(hasTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });
}
