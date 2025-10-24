import { Outlet } from "react-router-dom"
import { SideBarClient } from "./Sidebar/SideBarClient.tsx"

export const LayoutClient = () => {
  return (
    <div className="flex  h-screen overflow-hidden">
      <SideBarClient />
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6 ">
        <Outlet />
      </main>
    </div>
  )
}