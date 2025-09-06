"use client"

const BadgeCards = () => {

    const earnedBadgesData = [
        { icon: "🏆", label: "First Upload", date: "Jan 10, 2025", unlocked: true},
        { icon: "🎬", label: "Video Creator", date: "Jan 12, 2025", unlocked: true },
        { icon: "📈", label: "Trending", date: "Jan 15, 2025", unlocked: true },
        { icon: "👥", label: "Community Favorite", date: "Jan 18, 2025", unlocked: true },
        { icon: "⭐", label: "Top Creator", desc: "Reach top 10", unlocked: false},
        { icon: "🔥", label: "Viral Hit", desc: "10K+ views", unlocked: false },
        { icon: "🎓", label: "Graduate", desc: "Complete bootcamp", unlocked: false },
        { icon: "💎", label: "Diamond Creator", desc: "1000+ points", unlocked: false },
    ];

    return (
        <section className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Badges
                </h3>
                <span className="text-sm text-emerald-600 font-medium">
                    {earnedBadgesData.filter((b) => b.unlocked).length}/{earnedBadgesData.length} unlocked
                </span>
            </div>
            <div className='flex flex-col gap-4 mb-4'>
                <h3>Earned Badges</h3>
                <div className="grid grid-cols-4 gap-3">
                    {earnedBadgesData.filter((b) => b.unlocked).map((badge, i) => (
                        <div key={i} className={`text-center p-3 rounded-xl ${badge.unlocked ? "bg-yellow-50 dark:bg-yellow-900/30" : "bg-gray-50 dark:bg-[#3f3f3f]/50"}`} >
                            <div className="text-2xl mb-1">{badge.icon}</div>
                            <div className='text-sm'>
                                {badge.label}
                            </div>
                            <div className={`text-xs font-medium ${badge.unlocked ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                                {badge.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3>Available Badges</h3>
                <div className="grid grid-cols-4 gap-3">
                    {earnedBadgesData.filter((b) => b.unlocked === false).map((badge, i) => (
                        <div key={i} className={`text-center p-3 rounded-xl ${badge.unlocked ? "bg-yellow-50 dark:bg-yellow-900/30" : "bg-gray-50 dark:bg-[#3f3f3f]/50"}`} >
                            <div className="text-2xl mb-1">{badge.icon}</div>
                            <div className='text-sm'>
                                {badge.label}
                            </div>
                            <div className={`text-xs font-medium ${badge.unlocked ? "text-gray-700 dark:text-gray-200" : "text-gray-500 dark:text-gray-400"}`}>
                                {badge.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BadgeCards;