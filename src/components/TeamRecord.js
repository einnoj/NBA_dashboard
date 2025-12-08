import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeamRecordDonut({ team }) {
  if (!team) return null;

  const data = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [team.wins, team.losses],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
    cutout: '65%',
  };

  return (
    <div style={{ width: '200px', margin: '0 auto' }}>
      <Doughnut
        data={data}
        options={options}
        aria-label={`${team.name} record donut chart showing ${team.wins} wins and ${team.losses} losses`}
      />
    </div>
  );
}