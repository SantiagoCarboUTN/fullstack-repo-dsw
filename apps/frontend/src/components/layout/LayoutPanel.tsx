import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import type { Admin } from "../../types/AdminType.tsx";
import type { Client } from "../../types/ClientType.tsx";

interface LayoutPanelProps {
  SidebarComponent: React.ComponentType<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> ;admin?:Admin|undefined ;client?:Client|undefined }>;
  useUser:()=> {
    client?: Client | undefined
    admin?: Admin | undefined
    loading: boolean;
    error: string | null | undefined;
}
}

export const LayoutPanel: React.FC<LayoutPanelProps> = ({ SidebarComponent, useUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {client,admin, loading,error} = useUser()
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR (dinámico: Admin o Client) */}
       {loading ? (
            <p className="p-4">Cargando usuario...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
        <SidebarComponent isOpen={isOpen} setIsOpen={setIsOpen} admin={admin} client={client} />
          )}
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
