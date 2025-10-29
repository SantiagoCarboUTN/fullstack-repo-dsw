import { useClient } from "../../hooks/Client/useClient.tsx";
import { LayoutPanel } from "./LayoutPanel";
import { SideBarClient } from "./Sidebar/SideBarClient";

export const LayoutClient = () => {
  return <LayoutPanel SidebarComponent={SideBarClient} useUser={useClient}/>;
};
