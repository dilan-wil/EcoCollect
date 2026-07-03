import * as React from "react"
import { Sidebar } from "./Sidebar"
import { Navbar } from "./Navbar"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"

export function AppLayout({ children }: { children: React.ReactNode }) {
  useScrollToTop()
  
  return (
    <div className="flex min-h-[100dvh] bg-background w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64 transition-all">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
