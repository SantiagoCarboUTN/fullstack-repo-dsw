  import { useEffect, useRef } from "react";
  import { Chart, type ChartConfiguration, type ChartType } from "chart.js/auto";
  import { useCuotas } from "../../hooks/Cuota/useCuotas";
  import dayjs from "dayjs";

  interface TotalRecaudadoChartProps {
    year: number; // 👈 el año que queremos mostrar
  }

  export const TotalRecaudadoChart = ({ year }: TotalRecaudadoChartProps) => {
    const { cuotas, loading, error } = useCuotas("pagada");
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
      if (!chartRef.current || loading || error) return;
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      if (chartInstance.current) chartInstance.current.destroy();

      // ✅ Filtrar cuotas del año indicado
      const cuotasDelAnio = cuotas.filter((cuota) => {
        const fecha = dayjs(cuota.fechaPago);
        return fecha.year() === year;
      });

      const monthlyTotals: { [month: string]: number } = {};

      // Inicializar todos los meses en 0 (para mostrar 12 meses siempre)
      const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      allMonths.forEach((m) => (monthlyTotals[m] = 0));

      // Sumar montos por mes
      cuotasDelAnio.forEach((cuota) => {
        const fecha = dayjs(cuota.fechaPago);
        const mes = fecha.format("MMM");
        monthlyTotals[mes] += cuota.monto || 0;
      });

      const labels = allMonths;
      const data = labels.map((m) => monthlyTotals[m]);

      const config: ChartConfiguration<ChartType, number[], string> = {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: `Total Recaudado ${year} ($)`,
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
            title: { display: true, text: `Recaudación Mensual - ${year}` },
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

      return () => chartInstance.current?.destroy();
    }, [cuotas, loading, error, year]);

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>Error al cargar datos: {error}</div>;
    if (!cuotas.length) return <div>No hay cuotas pagadas registradas.</div>;

    return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-3xl">
        <canvas ref={chartRef} className="w-full h-[400px]"></canvas>
      </div>
    </div>
  );
  };