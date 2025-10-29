import { LayoutPanel } from "./LayoutPanel";
import { SideBarClient } from "./Sidebar/SideBarClient";

export const LayoutClient = () => {
  return <LayoutPanel SidebarComponent={SideBarClient} />;
};
