
import { cn } from "@/lib/utils"

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="mb-6">
      <div className="inline-flex items-center rounded-md border bg-background p-1 shadow-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                "relative inline-flex items-center rounded-sm px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
