import CheckboxField from "../CheckboxField/CheckboxField";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import TextareaField from "../TextareaField/TextareaField";
import Card from "./form/Card";


export default function SubmitForm() {
  const challenges = [
    { value: "", label: "Select a challenge..." },
    { value: "delhi-street-food", label: "Delhi Street Food Spots" },
    { value: "mumbai-history", label: "Historic Mumbai" },
    { value: "bangalore-tech", label: "Bangalore Tech Hub" },
  ];

  return (
    <Card title="Submit Video URL">
      {/* URL Input Area */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors mb-6">
        <div className="text-4xl mb-4">🔗</div>
        <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Enter your video URL
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Paste the link to your video (YouTube, Instagram, TikTok, etc.)
        </p>
        <InputField
          id="video-url"
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          centered
        />
        <p className="text-xs text-gray-500 mt-3">
          Supported: YouTube, Instagram, TikTok, Vimeo
        </p>
      </div>

      {/* Form Fields */}
      <form id="submission-form" className="space-y-4">
        <InputField id="video-title" label="Video Title" placeholder="Give your video an engaging title..." />
        <TextareaField id="video-description" label="Description" placeholder="Describe what makes this content special..." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField id="video-challenge" label="Challenge" options={challenges} />
          <InputField id="video-location" label="Location" placeholder="Delhi, India" />
        </div>

        <CheckboxField
          id="terms"
          label="I agree to the content guidelines and terms of service"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Submit Video 🚀
        </button>
      </form>
    </Card>
  );
}
