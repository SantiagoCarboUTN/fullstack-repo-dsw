import { useEffect, useRef } from "react";
import { Chart, type ChartConfiguration, type ChartType } from "chart.js/auto";
import { useCuotas } from "../../hooks/Cuota/useCuotas";
import dayjs from "dayjs"; // Asegurate de tenerlo instalado: npm i dayjs

export const TotalRecaudadoChart: React.FC = () => {
  const { cuotas, loading, error } = useCuotas("pagada");
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Cargar gráfico al cambiar las cuotas
  useEffect(() => {
    if (!chartRef.current || loading || error) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Si ya hay un gráfico anterior, destruirlo
    if (chartInstance.current) chartInstance.current.destroy();

    // Agrupar las cuotas por mes
    const monthlyTotals: { [month: string]: number } = {};

    cuotas.forEach((cuota) => {
      const fecha = dayjs(cuota.fechaPago || cuota.fechaPago); // ajusta al campo real del backend
      const mes = fecha.format("MMM"); // Ejemplo: Ene, Feb, Mar
      monthlyTotals[mes] = (monthlyTotals[mes] || 0) + (cuota.monto || 0);
    });

    // Ordenar los meses en orden calendario
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labels = allMonths.filter((m) => Object.keys(monthlyTotals).includes(m));
    const data = labels.map((m) => monthlyTotals[m]);

    // Configuración del gráfico
    const config: ChartConfiguration<ChartType, number[], string> = {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Recaudado ($)",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: "top" },
          title: { display: true, text: "Recaudación Mensual" },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Monto ($)" },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    // Cleanup
    return () => chartInstance.current?.destroy();
  }, [cuotas, loading, error]);

  // Estados de carga / error
  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar datos: {error}</div>;
  if (!cuotas.length) return <div>No hay cuotas pagadas registradas.</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
