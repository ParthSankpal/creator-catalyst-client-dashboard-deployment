"use client";

import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextareaField";
import SelectField from "../SelectField/SelectField";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function SettingsPage() {
    return (
        <div
            id="creator-settings"
            className="page-content dark:bg-gray-900 min-h-screen transition-colors duration-300"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Page Heading */}
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Settings ⚙️
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Manage your profile, preferences, and account settings.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Profile Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6">
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
                            id="select city"
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
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
