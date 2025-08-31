import React from 'react'

const ProgressCard = () => {

    const progressData = [
        {
            data: "3/6",
            desc: "Weeks Completed",
            textColor: "text-emerald-600"
        },
        {
            data: "12/18",
            desc: "Videos Watched",
            textColor: "text-blue-600"
        },
        {
            data: "8/12",
            desc: "Assignments Done",
            textColor: "text-purple-600"
        },
        {
            data: "85%",
            desc: "Overall score",
            textColor: "text-orange-600"
        },
    ]

    return (
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Your Progress
                </h3>
                <span className="text-sm text-emerald-600 font-medium">
                    Week 3 of 6
                </span>
            </div>
            <div className='w-full h-2 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden mb-4'>
                <div className={`w-[20%] bg-emerald-600 h-full rounded-full`}></div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {progressData.map((item, index) => (
                    <div key={index} className="text-center">
                        <div className={`text-2xl font-bold ${item.textColor}`}>
                            {item.data}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {item.desc}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProgressCard
