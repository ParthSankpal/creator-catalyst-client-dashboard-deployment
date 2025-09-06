"use client"

const RecentActivity = () => {

    const recentActivityData = [
        {
            icon: "+", 
            title: "Challenge completed", 
            description: "+50 points", 
            days: "2 days ago"
        },
        {
            icon: "🏆", 
            title: "Challenge completed", 
            description: "Trending", 
            days: "3 days ago"
        }
    ]

    return (
        <section className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Recent Activity
            </h3>
            <div className="flex flex-col gap-2">
                {
                    recentActivityData.map((recentActivity, index) => 
                        <div key={index} className="flex items-center gap-3">
                            <span className={`${index === 0 ? "bg-green-100 text-emerald-700" : "bg-blue-100"} w-10 h-10 rounded-full flex items-center justify-center`}>{recentActivity.icon}</span>
                            <div className="flex flex-col gap-0.5">
                                <p>{recentActivity.title}</p>
                                <div className="flex items-center gap-1 text-xs">
                                    <span>{ recentActivity.description }</span>
                                    &bull;
                                    <span>{ recentActivity.days }</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default RecentActivity;