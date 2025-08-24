"use client";

import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextareaField";
import SelectField from "../SelectField/SelectField";

export default function ProfileForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect API here
    console.log("Profile form submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Profile Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Name" type="text" defaultValue="Priya Sharma" />
        <InputField
          label="Email"
          type="email"
          defaultValue="priya.sharma@email.com"
        />
        <SelectField
          id="city"
          label="City"
          options={["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"]}
          defaultValue="Delhi"
        />
        <InputField
          label="Phone Number"
          type="tel"
          defaultValue="+91 98765 43210"
        />
      </div>

      <div className="mt-6">
        <TextAreaField
          label="Bio"
          rows={3}
          defaultValue="Passionate content creator showcasing the vibrant culture and hidden gems of Delhi."
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
