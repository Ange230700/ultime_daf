// src/pages/Stats.tsx

import { useEffect, useState } from "react";
import { fetchWantedList } from "../api/api";
import { Chart } from "primereact/chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface StatsData {
  posterCounts: Record<string, number>;
  officeCounts: Record<string, number>;
  byYear: Record<number, number>;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);

  const loadStats = async () => {
    try {
      const { items } = await fetchWantedList({ pageSize: 1000 });
      const posterCounts: Record<string, number> = {};
      const officeCounts: Record<string, number> = {};
      const byYear: Record<number, number> = {};

      for (const it of items) {
        // 1) Poster classification
        const cls = it.poster_classification ?? "unknown";
        posterCounts[cls] = (posterCounts[cls] ?? 0) + 1;

        // 2) Field offices
        if (it.field_offices) {
          for (const office of it.field_offices) {
            officeCounts[office] = (officeCounts[office] ?? 0) + 1;
          }
        }

        // 3) Publication year
        if (it.publication) {
          const year = new Date(it.publication).getFullYear();
          byYear[year] = (byYear[year] ?? 0) + 1;
        }
      }

      setStats({ posterCounts, officeCounts, byYear });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) {
    return <p>Loading stats…</p>;
  }

  // Theme CSS variables
  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue("--text-color").trim();
  const textColorSecondary = style
    .getPropertyValue("--text-color-secondary")
    .trim();
  const surfaceBorder = style.getPropertyValue("--surface-border").trim();
  const themeColors = [
    style.getPropertyValue("--blue-500").trim(),
    style.getPropertyValue("--green-500").trim(),
    style.getPropertyValue("--yellow-500").trim(),
    style.getPropertyValue("--red-500").trim(),
  ];

  // Build chart data
  const pieLabels = Object.keys(stats.posterCounts);
  const pieValues = Object.values(stats.posterCounts);

  const barLabels = Object.keys(stats.officeCounts);
  const barValues = Object.values(stats.officeCounts);
  const barColors = barLabels.map(
    (_, i) => themeColors[i % themeColors.length],
  );

  const lineLabels = Object.keys(stats.byYear);
  const lineValues = Object.values(stats.byYear);

  // Common chart options for legend and color

  const chartOptions = {
    maintainAspectRatio: false,
    // you can add other Chart.js options here
  };

  const commonOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        label: { color: textColor },
      },
    },
  };

  // Pie options with data labels plugin for percentages
  const pieOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      datalabels: {
        color: textColor,
        formatter: (
          value: number,
          ctx: { chart: { data: { datasets: Array<{ data: number[] }> } } },
        ) => {
          const dataArr = ctx.chart.data.datasets[0].data;
          const sum = dataArr.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value * 100) / sum).toFixed(1) + "%";
          return percentage;
        },
        anchor: "center",
        align: "center",
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: {
        ticks: { color: textColorSecondary },
        grid: { color: surfaceBorder },
      },
      y: {
        ticks: { color: textColorSecondary },
        grid: { color: surfaceBorder },
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      x: {
        ticks: { color: textColorSecondary },
        grid: { color: surfaceBorder },
      },
      y: {
        ticks: { color: textColorSecondary },
        grid: { color: surfaceBorder },
      },
    },
  };

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: themeColors.slice(0, pieLabels.length),
      },
    ],
  };

  const barData = {
    labels: Object.keys(stats.officeCounts),
    datasets: [
      {
        label: "Cases by Field Office",
        data: barValues,
        backgroundColor: barColors,
      },
    ],
  };

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Publications per Year",
        data: lineValues,
        fill: false,
        tension: 0.4,
        borderColor: themeColors[0],
      },
    ],
  };

  return (
    <article className="prose mx-auto my-8">
      <div className="grid grid-cols-1 gap-8">
        {/* Pie */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-2 text-2xl font-semibold">Poster Classification</h2>
          <div className="h-112">
            <Chart
              type="pie"
              data={pieData}
              options={pieOptions}
              style={{ height: "100%" }}
            />
          </div>
        </section>

        {/* Bar */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-2 text-2xl font-semibold">
            Field Office Case Counts
          </h2>
          <div className="h-112">
            <Chart
              type="bar"
              data={barData}
              options={barOptions}
              style={{ height: "100%" }}
            />
          </div>
        </section>

        {/* Line */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-2 text-2xl font-semibold">
            Yearly Publication Trend
          </h2>
          <div className="h-112">
            <Chart
              type="line"
              data={lineData}
              options={lineOptions}
              style={{ height: "100%" }}
            />
          </div>
        </section>
      </div>
    </article>
  );
}
