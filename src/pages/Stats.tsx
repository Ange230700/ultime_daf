// src/pages/Stats.tsx

import { useEffect, useState } from "react";
import { fetchWantedList } from "../api/api";
import { Chart } from "primereact/chart";

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

  const pieData = {
    labels: Object.keys(stats.posterCounts),
    datasets: [{ data: Object.values(stats.posterCounts) }],
  };

  const barData = {
    labels: Object.keys(stats.officeCounts),
    datasets: [
      {
        label: "Cases by Field Office",
        data: Object.values(stats.officeCounts),
      },
    ],
  };

  const lineData = {
    labels: Object.keys(stats.byYear),
    datasets: [
      {
        label: "Publications per Year",
        data: Object.values(stats.byYear),
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    // you can add other Chart.js options here
  };

  return (
    <article className="prose mx-auto my-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Pie */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">Poster Classification</h2>
          <div className="h-64">
            <Chart
              type="pie"
              data={pieData}
              options={chartOptions}
              style={{ height: "100%" }}
            />
          </div>
        </section>

        {/* Bar */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">
            Field Office Case Counts
          </h2>
          <div className="h-64">
            <Chart
              type="bar"
              data={barData}
              options={chartOptions}
              style={{ height: "100%" }}
            />
          </div>
        </section>

        {/* Line */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">
            Yearly Publication Trend
          </h2>
          <div className="h-64">
            <Chart
              type="line"
              data={lineData}
              options={chartOptions}
              style={{ height: "100%" }}
            />
          </div>
        </section>
      </div>
    </article>
  );
}
