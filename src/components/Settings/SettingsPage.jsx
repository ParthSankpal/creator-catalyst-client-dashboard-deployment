"use client";

import NotificationsForm from "./NotificationsForm";
import ProfileForm from "./ProfileForm";


export default function SettingsPage() {
    return (
        <div
            id="creator-settings"
            className="page-content dark:bg-[#222222] min-h-screen transition-colors duration-300"
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
                
                    <ProfileForm />
                    <NotificationsForm />
                </div>
            </div>
        </div>
    );
}
