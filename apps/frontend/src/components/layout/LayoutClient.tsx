import { Outlet } from "react-router-dom"
import { SideBarClient } from "./Sidebar/SideBarClient.tsx"
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export const LayoutClient = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex  h-screen overflow-hidden">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-800 p-4 text-white transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex md:flex-col md:justify-between`}
        >
        <SideBarClient />
      </aside>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6 relative">
        <button
          className="md:hidden p-3 bg-gray-800 text-white rounded-md mb-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={20} />
        </button>
        <Outlet />
      </main>
    </div>
  )
}
/*  */