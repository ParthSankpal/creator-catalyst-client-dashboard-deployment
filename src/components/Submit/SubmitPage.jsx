"use client";

import SubmitForm from "./SubmitForm";
import SubmitGuidelines from "./SubmitGuidelines";
import RecentSubmissions from "./RecentSubmissions";

export default function SubmitPage() {
  return (
    <div id="creator-submit" className="page-content min-h-screen dark:bg-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Submit Your Content 📤
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Submit your video URL to participate in challenges and earn points!
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <SubmitForm />
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <SubmitGuidelines />
            <RecentSubmissions />
          </div>
        </div>
      </div>
    </div>
  );
}
