"use client";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function NotificationsForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect API here
    console.log("Notification form submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Notifications
      </h3>

      <div className="space-y-4">
        <ToggleSwitch
          label="New Challenges"
          description="Get notified when new challenges are available"
          defaultChecked
        />
        <ToggleSwitch
          label="Leaderboard Updates"
          description="Weekly ranking changes and achievements"
          defaultChecked
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Save Preferences
        </button>
      </div>
    </form>
  );
}
