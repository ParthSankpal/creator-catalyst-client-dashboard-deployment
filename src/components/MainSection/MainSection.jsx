

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Navbar from "../Navbar/Navbar"
import AppSidebar from "../Sidebar/AppSidebar"

export default function MainSection({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Sidebar */}
        <AppSidebar />

        {/* Inset wraps Navbar + Content */}
        <SidebarInset className="flex flex-col flex-1 w-full">
          {/* Navbar full width */}
          <Navbar />

          {/* Main content area expands correctly */}
          <main className="flex-1 w-full p-6 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
