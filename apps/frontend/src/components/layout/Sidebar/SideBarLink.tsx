import { Link, useLocation } from "react-router-dom"
import type { IconType } from "react-icons"

interface SideBarLinkProps {
  to: string
  label: string
  icon: IconType
}

export const SideBarLink = ({ to, label, icon: Icon }: SideBarLinkProps) => {
  const { pathname } = useLocation()

  const isActive = pathname === to

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-md mb-2 transition-colors ${
        isActive
          ? "bg-gray-700 text-white"
          : "hover:bg-gray-700 text-gray-200"
      }`}
    >
      <Icon size={20} />
      {label}
    </Link>
  )
}