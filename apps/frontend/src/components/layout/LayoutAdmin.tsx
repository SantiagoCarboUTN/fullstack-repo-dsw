import { Outlet } from "react-router-dom"
import { SideBarAdmin } from "./Sidebar/SideBarAdmin"

export const LayoutAdmin = () => {
  return (
    <div className="flex">
      <SideBarAdmin />
      <main className="flex-1  bg-gray-100 min-h-screen ">
        <Outlet />
      </main>
    </div>
  )
}