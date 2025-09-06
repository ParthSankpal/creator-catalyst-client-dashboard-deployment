"use client"

const RewardsStore = () => {

    const rewardsStoreData = [
        {
            icon: "🎧",
            title: "Wireless Earbuds",
            desc: "Premium quality audio gear",
            points: 500
        },
        {
            icon: "☕",
            title: "Café Voucher",
            desc: "₹500 coffee shop credit",
            points: 200
        }
    ]

    return (
        <section className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Rewards Store
            </h3>
            <div className='grid grid-cols-2 space-x-2 space-y-2'>
                {
                    rewardsStoreData.map((reward,index) => 
                        <div key={index} className="flex flex-col gap-3 rounded-xl p-3 border border-slate-200/50 dark:border-slate-200/20 h-full">
                            <div className="flex flex-col items-center gap-1">
                                <span className="flex items-center justify-center p-2 w-10 h-10 text-3xl">{reward.icon}</span>
                                <span>{reward.title}</span>
                                <span className="text-xs">{reward.desc}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Cost</span>
                                <span className="text-emerald-700 font-semibold">{reward.points} points</span>
                            </div>
                            <button className="font-medium py-2 bg-emerald-700 rounded-lg">Redeem Now</button>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default RewardsStore;