"use client"

const PointsBalance = () => {
    return (
        <section className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Points Balance
            </h3>
            <div className="flex flex-col items-center gap-1 mb-4">
                <span className="text-4xl font-bold text-emerald-700">260</span>
                <p className="text-sm">Available Points</p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <span>Earned this week</span>
                    <span className="text-emerald-700">+45</span>
                </div>
                <div className="flex justify-between">
                    <span>Total earned</span>
                    <span>360</span>
                </div>
                <div className="flex justify-between">
                    <span>Redeemed</span>
                    <span>100</span>
                </div>
            </div>
        </section>
    )
}

export default PointsBalance;