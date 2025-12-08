import React, { useState, useMemo } from 'react';
import players from '../data/players.json';
import teams from '../data/teams.json';
import Top5Chart from '../components/Top5Chart';
import '../style.css';

export default function Top5() {
  const [stat, setStat] = useState('ppg');
  const [showChart, setShowChart] = useState(true);

  const teamMap = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      if (t.abbreviation) {
        map[t.abbreviation] = t.logo;
      }
    });
    return map;
  }, []);

  const sorted = [...players]
    .sort((a, b) => Number(b.perGame[stat]) - Number(a.perGame[stat]))
    .slice(0, 5);

  const getPlayerPhoto = (p) =>
    `https://cdn.nba.com/headshots/nba/latest/260x190/${p.playerId}.png`;

  return (
    <div className="players-container">
      <h1 className="mb-4">Top 5 Players by {stat.toUpperCase()}</h1>

      <div className="top5-controls">
        <select
          className="top5-select"
          value={stat}
          onChange={(e) => setStat(e.target.value)}
        >
          <option value="ppg">Points Per Game (PPG)</option>
          <option value="apg">Assists Per Game (APG)</option>
          <option value="rpg">Rebounds Per Game (RPG)</option>
        </select>

        <button
          className="top5-toggle-btn"
          onClick={() => setShowChart(!showChart)}
          aria-pressed={showChart}
        >
          {showChart ? "Show Player Cards" : "Show Chart"}
        </button>
      </div>

      {showChart ? (
        <Top5Chart players={sorted} stat={stat} />
      ) : (
        <div className="top5-grid">
          {sorted.map((p, index) => {
            const playerPhoto = getPlayerPhoto(p);
            const teamLogo = teamMap[p.team];

            return (
              <div key={p.playerId} className="top5-card">
                <div className="top5-card-header">
                  <span className="top5-rank">#{index + 1}</span>

                  {teamLogo && (
                    <img
                      src={teamLogo}
                      alt={`${p.team} logo`}
                      className="top5-team-logo"
                    />
                  )}
                </div>

                <img
                  src={playerPhoto}
                  alt={p.name}
                  className="top5-player-photo"
                />

                <h3 className="top5-name">{p.name}</h3>
                <p className="top5-team-text">{p.team}</p>

                <p className="top5-stat">
                  {stat.toUpperCase()}: {Number(p.perGame[stat]).toFixed(1)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}