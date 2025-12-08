import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TopPlayers({ playerA, playerB }) {
  if (!playerA || !playerB) {
    return null;
  }

  const data = {
    labels: ['PPG', 'RPG', 'APG'],
    datasets: [
      {
        label: playerA.name,
        data: [playerA.perGame.ppg, playerA.perGame.rpg, playerA.perGame.apg],
        backgroundColor: 'rgba(54, 162, 235, 0.7)', 
      },
      {
        label: playerB.name,
        data: [playerB.perGame.ppg, playerB.perGame.rpg, playerB.perGame.apg],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto' }}>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
        }}
      />
    </div>
  );
}
