"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Submit", href: "/submit", icon: UsersIcon },
  { name: "Challenges", href: "/challenges", icon: FolderIcon },
  { name: "Modules", href: "/modules", icon: CalendarIcon },
  { name: "Leaderboard", href: "/leaderboard", icon: DocumentDuplicateIcon },
  { name: "Rewards", href: "/rewards", icon: ChartPieIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  return (
    <div
      className={classNames(
        collapsed ? "w-20" : "w-64",
        "hidden md:fixed md:inset-y-0 md:z-40 md:flex md:flex-col border-r mt-20 border-gray-200 bg-white dark:border-white/10 dark:bg-black/10 transition-all duration-300"
      )}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-2 pb-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={classNames(
                    isActive
                      ? "bg-gray-50 text-indigo-600 dark:bg-white/5 dark:text-white"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white",
                    "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold"
                  )}
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
