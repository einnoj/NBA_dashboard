import React, { useState } from 'react';
import players from '../data/players.json';
import TopPlayers from '../components/TopPlayers';

export default function Players() {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');

  let resultA = [];
  if (searchA.trim() !== '') {
    resultA = players.filter(function (p) {
      return p.name.toLowerCase().includes(searchA.toLowerCase());
    });
  }
  const playerA = resultA[0];

  let resultB = [];
  if (searchB.trim() !== '') {
    resultB = players.filter(function (p) {
      return p.name.toLowerCase().includes(searchB.toLowerCase());
    });
  }
  const playerB = resultB[0];

  return (
    <div>
      <h1>Player Comparison</h1>

      <h3>Player A</h3>
      <input
        value={searchA}
        onChange={(e) => setSearchA(e.target.value)}
        placeholder="Type a player's name"
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      <h3>Player B</h3>
      <input
        value={searchB}
        onChange={(e) => setSearchB(e.target.value)}
        placeholder="Type a player's name"
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      {playerA && (
        <div className="card p-3 mb-3">
          <h3>{playerA.name}</h3>
          <p>PPG: {playerA.perGame.ppg}</p>
          <p>RPG: {playerA.perGame.rpg}</p>
          <p>APG: {playerA.perGame.apg}</p>
        </div>
      )}

      {playerB && (
        <div className="card p-3 mb-3">
          <h3>{playerB.name}</h3>
          <p>PPG: {playerB.perGame.ppg}</p>
          <p>RPG: {playerB.perGame.rpg}</p>
          <p>APG: {playerB.perGame.apg}</p>
        </div>
      )}

      <TopPlayers playerA={playerA} playerB={playerB} />
    </div>
  );
}
