
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Home,
  Users,
  Folder,
  Calendar,
  FileText,
  Award,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Submit", href: "/submit", icon: Users },
  { name: "Challenges", href: "/challenges", icon: Folder },
  { name: "Modules", href: "/modules", icon: Calendar },
  { name: "Leaderboard", href: "/leaderboard", icon: FileText },
  { name: "Rewards", href: "/rewards", icon: Award },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r ">
      {/* Logo / Header */}
      <SidebarHeader className="flex items-center justify-center py-4">
        <Image
          src="/logo.svg"
          alt="Company Logo"
          width={40}
          height={40}
          className="rounded-md"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                        ${isActive
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"}
                      `}
                    >
                      <item.icon className=" size-6 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
