import Card from "./form/Card";

export default function SubmitGuidelines() {
  const guidelines = [
    "Video duration: 15-60 seconds",
    "Vertical format preferred (9:16 ratio)",
    "Clear audio and good lighting",
    "Original content only",
    "Must feature your city/location",
  ];

  return (
    <Card title="Submission Guidelines">
      <div className="space-y-3 text-sm">
        {guidelines.map((rule, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-emerald-500">✓</span>
            <span className="text-gray-600 dark:text-gray-300">{rule}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
