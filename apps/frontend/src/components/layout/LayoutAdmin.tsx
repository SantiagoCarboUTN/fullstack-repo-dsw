import { LayoutPanel } from "./LayoutPanel";
import { SideBarAdmin } from "./Sidebar/SideBarAdmin";

export const LayoutAdmin = () => {
  return <LayoutPanel SidebarComponent={SideBarAdmin} />;
};
