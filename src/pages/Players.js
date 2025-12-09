import React, { useState } from 'react';
import players from '../data/players.json';
import TopPlayers from '../components/TopPlayers';
import '../style.css';

export default function Players() {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const playersSorted = [...players].sort((a, b) =>
  a.name.localeCompare(b.name)
  );  

  let resultA = [];
  if (searchA.trim() !== '') {
    resultA = players.filter((p) =>
      p.name.toLowerCase().includes(searchA.toLowerCase())
    );
  }
  const playerA = resultA[0];

  let resultB = [];
  if (searchB.trim() !== '') {
    resultB = players.filter((p) =>
      p.name.toLowerCase().includes(searchB.toLowerCase())
    );
  }
  const playerB = resultB[0];

  const photoA = playerA
    ? `https://cdn.nba.com/headshots/nba/latest/260x190/${playerA.playerId}.png`
    : null;

  const photoB = playerB
    ? `https://cdn.nba.com/headshots/nba/latest/260x190/${playerB.playerId}.png`
    : null;

  return (
    <div className="players-container">
      <h1 className="player-header text-center">Player Comparison</h1>

      <div className="player-inputs">
        <div>
          <h3>Player A</h3>
          <input
            value={searchA}
            onChange={(e) => setSearchA(e.target.value)}
            placeholder="Type a player's name"
            className="player-input"
            list='players-list'
          />
        </div>

        <div>
          <h3>Player B</h3>
          <input
            value={searchB}
            onChange={(e) => setSearchB(e.target.value)}
            placeholder="Type a player's name"
            className="player-input"
            list='players-list'
          />
        </div>
      </div>

      <datalist id="players-list">
        {playersSorted.map((p) => (
          <option key={p.playerId} value={p.name} />
        ))}
      </datalist>

      <div className="player-cards">
        {playerA && (
          <div className="player-card">
            {photoA && (<img src={photoA} alt={playerA.name} className="player-photo" />)}
            <h3>{playerA.name}</h3>
            <p>PPG: {playerA.perGame.ppg.toFixed(1)}</p>
            <p>RPG: {playerA.perGame.rpg.toFixed(1)}</p>
            <p>APG: {playerA.perGame.apg.toFixed(1)}</p>
          </div>
        )}

        {playerB && (
          <div className="player-card">
            {photoB && (<img src={photoB} alt={playerB.name} className="player-photo" />)}
            <h3>{playerB.name}</h3>
            <p>PPG: {playerB.perGame.ppg.toFixed(1)}</p>
            <p>RPG: {playerB.perGame.rpg.toFixed(1)}</p>
            <p>APG: {playerB.perGame.apg.toFixed(1)}</p>
          </div>
        )}
      </div>

      <TopPlayers playerA={playerA} playerB={playerB} />
    </div>
  );
}