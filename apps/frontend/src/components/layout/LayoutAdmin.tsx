import { useAdmin } from "../../hooks/Admin/useAdmin.tsx";
import { LayoutPanel } from "./LayoutPanel";
import { SideBarAdmin } from "./Sidebar/SideBarAdmin";

export const LayoutAdmin = () => {
  return <LayoutPanel SidebarComponent={SideBarAdmin} useUser={useAdmin} id_user="1"/>;
};
