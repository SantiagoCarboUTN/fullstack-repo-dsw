
import {PruebaChart} from '../../components/charts/PruebaChart';
import { TotalRecaudadoChart } from '../../components/charts/TotalRecaudadoChart';
export const Reportes = () => {

  return (
  <div className="p-8 w-full h-[500px]">
  <h1 className="text-xl font-semibold mb-4">Total Recaudado Este Año</h1>
  <PruebaChart />
  <div className="p-8 w-full h-[500px]">
      <h1 className="text-xl font-semibold mb-4">Total Recaudado Este Año</h1>
      <TotalRecaudadoChart />
    </div>
</div>
  );
};