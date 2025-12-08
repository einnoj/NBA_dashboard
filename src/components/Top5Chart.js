import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Top5Chart({ players, stat }) {
  if (!players || players.length === 0) return null;

  const labels = players.map((p) => p.name);
  const values = players.map((p) => Number(p.perGame[stat]));
  const colors = ["#1F77B4", "#FF7F0E", "#2CA02C", "#9467BD", "#8C564B"];

  const data = {
    labels,
    datasets: [
      {
        label: stat.toUpperCase(),
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="top5-chart">
      <Bar data={data} options={options} />
    </div>
  );
}