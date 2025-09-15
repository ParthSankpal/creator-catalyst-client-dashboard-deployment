"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CreatorSubscribe, CreatorUnsubscribe,  } from "@/src/api/notificationApi";

export default function NotificationsForm() {
  const [preferences, setPreferences] = useState({
    optionOne: true,
    optionTwo: false,
  });
  const [saving, setSaving] = useState(false);

  const handleToggle = async (key) => {
    const newValue = !preferences[key];
    setPreferences((prev) => ({ ...prev, [key]: newValue }));

    try {
      setSaving(true);
      const token = { topic: key }; // sending key as topic (adjust if needed)
      if (newValue) {
        await CreatorSubscribe(token);
        console.log("Subscribed to:", key);
      } else {
        await CreatorUnsubscribe(token);
        console.log("Unsubscribed from:", key);
      }
    } catch (err) {
      console.error("Error updating preference:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Notification Preferences
      </h3>

      <div className="space-y-6">
        {/* Option One */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="optionOne"
            className="text-gray-700 dark:text-gray-200 font-medium"
          >
            Option One
          </Label>
          <Switch
            id="optionOne"
            checked={preferences.optionOne}
            onCheckedChange={() => handleToggle("optionOne")}
            disabled={saving}
          />
        </div>

        {/* Option Two */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="optionTwo"
            className="text-gray-700 dark:text-gray-200 font-medium"
          >
            Option Two
          </Label>
          <Switch
            id="optionTwo"
            checked={preferences.optionTwo}
            onCheckedChange={() => handleToggle("optionTwo")}
            disabled={saving}
          />
        </div>
      </div>
    </div>
  );
}
