"use client"

import BadgeCards from './BadgesCard';
import PointsBalance from './PointsBalance';
import RecentActivity from './RecentActivity';
import RewardsStore from './RewardsStore';

const RewardsPage = () => {
    return (
        <div className="page-content min-h-screen dark:bg-[#222222]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Rewards & Badges 🎁
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Earn badges, unlock achievements, and redeem exciting rewards!
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left section */}
                    <div className="lg:col-span-2 space-y-6">
                        <BadgeCards />
                        <RewardsStore />
                    </div>

                    {/* Right Section */}
                    <div className="space-y-6">
                        <PointsBalance />
                        <RecentActivity />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RewardsPage;