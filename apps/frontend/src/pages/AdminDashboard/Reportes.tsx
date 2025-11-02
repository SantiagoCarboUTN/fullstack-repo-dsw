import { useState } from "react";
import dayjs from "dayjs";
import { TotalRecaudadoChart } from "../../components/charts/TotalRecaudadoChart";
import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard";
import { useCuotas } from "../../hooks/Cuota/useCuotas";

export const Reportes = () => {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear - 1);
  const { cuotas, loading, error } = useCuotas("pagada");

  /* agrupo por mes */
  const agruparPorMes = (year: number) =>
    Array.from({ length: 12 }, (_, i) => {
      const total = cuotas
        .filter(
          (c) =>
            c.fechaPago &&
            dayjs(c.fechaPago).year() === year &&
            dayjs(c.fechaPago).month() === i
        )
        .reduce((acc, c) => acc + c.monto, 0);

      return { mes: dayjs().month(i).format("MMMM"), total };
    });

  const currentData = agruparPorMes(currentYear);
  const selectedData = agruparPorMes(selectedYear);

  /* Totales */
  const totalActual = currentData.reduce((a, b) => a + b.total, 0);
  const totalSeleccionado = selectedData.reduce((a, b) => a + b.total, 0);
  const diferencia = totalActual - totalSeleccionado;

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar datos: {error}</div>;

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center">Reportes de Recaudación</h2>

        {/* Selector de año */}
      <div className = 'flex flex-row items-center gap-2'>   
        <label className="font-medium  text-lg">
          Seleccionar año:
        </label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          placeholder = {(currentYear -1).toString()}
          className=" border border-gray-300 p-4 rounded w-28 text-lg text-center 
                    text-blue-700 font-semibold 
                    focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 
                    transition duration-200 bg-white"
        />
      </div> 



      {/* Graficos */}
      <TotalRecaudadoChart year={currentYear} />
      <TotalRecaudadoChart year={selectedYear} />

      {/* Comparativa mensual */}
      <div className="w-full max-w-3xl border rounded-xl shadow p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
          Comparativa mensual {currentYear} vs {selectedYear}
        </h2>

        <ul className="divide-y divide-gray-200">
          {currentData.map((m, i) => {
            const otro = selectedData[i];
            const diff = m.total - otro.total;
            const color =
              diff > 0
                ? "text-green-600"
                : diff < 0
                ? "text-red-600"
                : "text-gray-500";

            return (
              <li
                key={i}
                className="flex justify-between items-center py-2 px-1 hover:bg-gray-50 transition"
              >
                <div className="flex flex-col text-left capitalize w-1/4">
                  <span className="font-medium">{m.mes}</span>
                </div>

                <div className="flex justify-around flex-1 text-sm sm:text-base">
                  <span className="w-1/3 text-center font-medium text-gray-800">
                    ${m.total.toLocaleString()}
                  </span>
                  <span className="w-1/3 text-center font-medium text-gray-800">
                    ${otro.total.toLocaleString()}
                  </span>
                  <span className={`w-1/3 text-center font-semibold ${color}`}>
                    {diff > 0 ? "▲" : diff < 0 ? "▼" : "–"} $
                    {Math.abs(diff).toLocaleString()}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

          {/* InfoCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-4 px-2">
        <InfoCard label={`Total ${currentYear}:`} value={totalActual} />
        <InfoCard label={`Total ${selectedYear}:`} value={totalSeleccionado} />
        <InfoCard label="Diferencia:" value={diferencia} />
      </div>

    </div>
  );
};
