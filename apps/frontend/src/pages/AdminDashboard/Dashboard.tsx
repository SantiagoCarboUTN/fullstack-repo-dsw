import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard"

export const Dashboard = () => (
  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center">
    <InfoCard label="Cocheras Ocupadas:" value={34} />
    <InfoCard label="Cocheras Disponibles:" value={16} />
  </div>
)