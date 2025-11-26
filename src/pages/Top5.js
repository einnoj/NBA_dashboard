import React, { useState } from 'react';
import players from '../data/players.json';

export default function Top5() {
  const [stat, setStat] = useState('ppg'); // default is points per game

  // Sort using the correct nested perGame stats
  const sorted = [...players]
    .sort((a, b) => b.perGame[stat] - a.perGame[stat])
    .slice(0, 5);

  return (
    <div>
      <h1>Top 5 Players by {stat.toUpperCase()}</h1>

      <select
        value={stat}
        onChange={(e) => setStat(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px' }}
      >
        <option value="ppg">Points Per Game (PPG)</option>
        <option value="apg">Assists Per Game (APG)</option>
        <option value="rpg">Rebounds Per Game (RPG)</option>
      </select>

      {/* List of players */}
      <ul>
        {sorted.map((p, index) => (
          <li key={p.playerId} style={{ margin: '10px 0', fontSize: '18px' }}>
            <strong>#{index + 1}</strong> — {p.name}
            ({stat.toUpperCase()}: {p.perGame[stat].toFixed(1)})
          </li>
        ))}
      </ul>
    </div>
  );
}