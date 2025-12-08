import React from 'react';
import standings from '../data/standings.json';
import '../style.css';

function StandingsTable({ title, teams }) {
  const sorted = [...teams].sort((a, b) => a.conferenceRank - b.conferenceRank);

  return (
    <div className="standings-block">
      <h2 className="conference-header">{title}</h2>

      <table className="standings-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>PCT</th>
            <th>Division</th>
            <th>League Rank</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((t) => (
            <tr key={t.teamId}>
              <td>#{t.conferenceRank}</td>
              <td>
                {t.name} <span className="muted">({t.abbreviation})</span>
              </td>
              <td>{t.wins}</td>
              <td>{t.losses}</td>
              <td>{Number(t.winPct).toFixed(3)}</td>
              <td>{t.division}</td>
              <td>#{t.leagueRank}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Standings() {
  const { east, west } = standings;

  return (
    <div className="players-container">
      <h1 className="mb-4">NBA Standings</h1>

      <StandingsTable title="Eastern Conference" teams={east} />
      <StandingsTable title="Western Conference" teams={west} />
    </div>
  );
}