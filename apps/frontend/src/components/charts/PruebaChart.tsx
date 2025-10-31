import { useEffect, useRef } from "react";
import { Chart, type ChartConfiguration, type ChartType } from "chart.js/auto";

export const PruebaChart: React.FC = () => {
  // Referencia al canvas
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  // Referencia a la instancia del gráfico (para destruirlo luego)
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destruir el gráfico anterior si existe (para evitar fugas de memoria)
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Configuración del gráfico
    const config: ChartConfiguration<ChartType, number[], string> = {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, config);

    // Limpiar al desmontar el componente
    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
