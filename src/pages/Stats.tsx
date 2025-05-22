// src\pages\Stats.tsx

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

      // 2) single level of loop, no callbacks
      for (const it of items) {
        // poster classification
        const cls = it.poster_classification ?? "unknown";
        posterCounts[cls] = (posterCounts[cls] ?? 0) + 1;

        // field offices
        if (it.field_offices) {
          for (const office of it.field_offices) {
            officeCounts[office] = (officeCounts[office] ?? 0) + 1;
          }
        }

        // publication year
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

  // Prepare Chart.js data objects
  const pieData = {
    labels: Object.keys(stats.posterCounts),
    datasets: [
      {
        data: Object.values(stats.posterCounts),
        backgroundColor: [], // Chart.js will auto‐assign if empty
      },
    ],
  };

  const barData = {
    labels: Object.keys(stats.officeCounts),
    datasets: [
      {
        label: "Cases by Field Office",
        data: Object.values(stats.officeCounts),
        backgroundColor: [],
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

  return (
    <article className="prose mx-auto my-8">
      <h1>Statistics</h1>

      <section>
        <h2>Poster Classification Distribution</h2>
        <Chart type="pie" data={pieData} />
      </section>

      <section>
        <h2>Field Office Case Counts</h2>
        <Chart type="bar" data={barData} />
      </section>

      <section>
        <h2>Yearly Publication Trend</h2>
        <Chart type="line" data={lineData} />
      </section>
    </article>
  );
}
