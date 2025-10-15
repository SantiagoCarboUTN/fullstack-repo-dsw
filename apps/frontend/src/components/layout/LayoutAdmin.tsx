import { Outlet } from "react-router-dom"
import { SideBarAdmin } from "./Sidebar/SideBarAdmin"

export const LayoutAdmin = () => {
  return (
    <div className="flex  h-screen overflow-hidden">
      <SideBarAdmin />
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6 ">
        <Outlet />
      </main>
    </div>
  )
}