import React from 'react'
import ProgressCard from './ProgressCard'
import ModuleCard from './ModuleCard'

const ModulesPage = () => {

    const moduleCardData = [
        {
            icon: '📱',
            title: 'Week 1: Getting Started',
            description: 'Learn the basics of mobile content creation, equipment setup, and platform requirements.',
            videos: "3/3",
            assignments: "2/2",
            score: "92%",
            inProgress: false,
            unlocked: true,
        },
        {
            icon: '🎭',
            title: 'Week 2: Storytelling',
            description: 'Master the art of visual storytelling and narrative structure for short-form content.',
            videos: "4/4",
            assignments: "3/3",
            score: "88%",
            inProgress: false,
            unlocked: true,
        },
        {
            icon: '✂️',
            title: 'Week 3: Editing & Tools',
            description: 'Learn video editing techniques and essential tools for creating engaging short-form content.',
            videos: "2/3",
            assignments: "1/2",
            score: "75%",
            inProgress: true,
            unlocked: true,
        },
        {
            icon: '🎨',
            title: 'Week 4: Visual Design',
            description: 'Explore color theory, composition, and visual aesthetics for compelling content creation.',
            videos: "0/4",
            assignments: "0/3",
            inProgress: false,
            unlocked: false,
            unlocksAt: "Jan 22",
        },
        {
            icon: '📈',
            title: 'Week 5: Growth & Analytics',
            description: 'Understand audience engagement, analytics, and strategies for growing your content reach.',
            videos: "0/3",
            assignments: "0/2",
            inProgress: false,
            unlocked: false,
            unlocksAt: "Jan 29",
        },
        {
            icon: '🎓',
            title: 'Week 6: Final Project',
            description: "Apply everything you've learned in a comprehensive final project showcasing your skills.",
            videos: "0/2",
            assignments: "0/1",
            inProgress: false,
            unlocked: false,
            unlocksAt: "Feb 5",
        }
    ]

    return (
        <div className="page-content min-h-screen dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Learning Modules 📚
                    </h2>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Master content creation through our structured 6-week bootcamp program!
                    </p>
                </div>
                <div className="mb-8">
                    <ProgressCard/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        moduleCardData.map((module, index) => (
                            <ModuleCard 
                                key={index}
                                icon={module.icon}
                                title={module.title}
                                description={module.description}
                                videos={module.videos}
                                assignments={module.assignments}
                                score={module.score}
                                inProgress={module.inProgress}
                                unlocked={module.unlocked}
                                unlocksAt={module.unlocksAt}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ModulesPage
