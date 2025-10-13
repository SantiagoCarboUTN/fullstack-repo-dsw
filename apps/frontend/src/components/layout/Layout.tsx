import { Outlet } from "react-router-dom"
import { Sidebar } from "./SideBar"

export const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1  bg-gray-100 min-h-screen ">
        <Outlet />
      </main>
    </div>
  )
}