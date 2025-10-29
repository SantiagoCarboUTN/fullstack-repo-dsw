import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

interface LayoutPanelProps {
  SidebarComponent: React.ComponentType<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>;
}

export const LayoutPanel: React.FC<LayoutPanelProps> = ({ SidebarComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR (dinámico: Admin o Client) */}
      <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6 relative">
        {/* BOTÓN BURGER ARRIBA A LA DERECHA (solo móvil) */}
        <div className="fixed top-4 right-4 md:hidden z-50">
          <button
            className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BiMenu size={28} />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};
