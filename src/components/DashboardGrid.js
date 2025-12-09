import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import standings from '../data/standings.json';
import teams from '../data/teams.json';
import players from '../data/players.json';
import '../style.css';

function MvpCard({ player }) {
  if (!player) return null;

  const photo = `https://cdn.nba.com/headshots/nba/latest/260x190/${player.playerId}.png`;

  const ppg = Number(player.perGame?.ppg ?? 0).toFixed(1);
  const rpg = Number(player.perGame?.rpg ?? 0).toFixed(1);
  const apg = Number(player.perGame?.apg ?? 0).toFixed(1);

  return (
    <div className="stat-card">
      <div className="stat-label">Reigning MVP</div>

      <div className="mvp-compact-row">
        <img src={photo} alt={player.name} className="mvp-photo" />
        <div>
          <div className="mvp-compact-name">{player.name}</div>
          <div className="mvp-compact-stats">
            PPG: {ppg} • RPG: {rpg} • APG: {apg}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

function BestRecordCard({ team }) {
  const okcLogo =
    'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg';

  const logo = okcLogo;

  const record = team ? `${team.wins}-${team.losses}` : '—';
  const name = team ? team.name : '';

  return (
    <div className="stat-card">
      <div className="stat-label">Best Record</div>

      <img
        src={logo}
        alt="OKC Thunder logo"
        className="best-record-logo"
      />

      <div className="best-record-value">{record}</div>
      {name && <div className="stat-sub">{name}</div>}
    </div>
  );
}

function ChampionCard() {
  return (
    <div className="stat-card">
      <div className="stat-label">2024-2025 Champions</div>

      <div className="champion-row">
        <img
          src="https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg"
          alt="OKC Thunder logo"
          className="champion-logo"
        />
        <div className="stat-value">OKC Thunder</div>
      </div>
    </div>
  );
}

function TopLeaderSelector({ playersList }) {
  const [stat, setStat] = useState('ppg');

  const statLabels = {
    ppg: 'Points Per Game',
    apg: 'Assists Per Game',
    rpg: 'Rebounds Per Game',
  };

  const topPlayer = useMemo(() => {
    const sorted = [...playersList].sort(
      (a, b) => Number(b.perGame?.[stat] ?? 0) - Number(a.perGame?.[stat] ?? 0)
    );
    return sorted[0];
  }, [playersList, stat]);

  const getPhoto = (p) =>
    `https://cdn.nba.com/headshots/nba/latest/260x190/${p.playerId}.png`;

  const leaderValue = topPlayer
    ? Number(topPlayer.perGame?.[stat] ?? 0).toFixed(1)
    : '0.0';

  return (
    <div>
      <div className="leader-controls">
        <label htmlFor="leader-stat">
          Select Stat:
        </label>
        <select
          id="leader-stat"
          className="top5-select"
          value={stat}
          onChange={(e) => setStat(e.target.value)}
        >
          <option value="ppg">PPG</option>
          <option value="apg">APG</option>
          <option value="rpg">RPG</option>
        </select>
      </div>

      {topPlayer && (
        <div className="stat-card">
          <div className="stat-label">Top {stat.toUpperCase()}</div>

          <img
            src={getPhoto(topPlayer)}
            alt={topPlayer.name}
            className="leader-photo-compact"
          />

          <div className="leader-name-compact">{topPlayer.name}</div>
          <div className="leader-sub-compact">{statLabels[stat]}</div>

          <div className="leader-value-compact">{leaderValue}</div>
        </div>
      )}
    </div>
  );
}

export default function DashboardGrid() {
  const { east, west } = standings;

  const { bestTeam, top3Teams } = useMemo(() => {
    const allTeams = [...east, ...west].sort(
      (a, b) => Number(b.winPct) - Number(a.winPct)
    );

    return {
      bestTeam: allTeams[0],
      top3Teams: allTeams.slice(0, 5),
    };
  }, [east, west]);

  const teamLogoMapById = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      map[t.teamId] = t.logo;
    });
    return map;
  }, []);

  const mvp = useMemo(() => {
    return players.find((p) =>
      p.name.toLowerCase().includes('shai gilgeous-alexander')
    );
  }, []);

  return (
    <>
      <div className="stats-row">
        <MvpCard player={mvp} />
        <BestRecordCard team={bestTeam} />
        <ChampionCard />
      </div>

      <div className="home-grid">
        <div className="dash-section">
          <div className="dash-section-title">Top Stat Leader</div>
          <TopLeaderSelector playersList={players} />
        </div>

        <div className="dash-section">
          <div className="dash-section-title">Top 5 Teams by Win%</div>

          <div className="top3-list">
            {top3Teams.map((t, i) => (
              <div key={t.teamId} className="top3-row">
                <span className="top3-rank">#{i + 1}</span>

                {teamLogoMapById[t.teamId] && (
                  <img
                    src={teamLogoMapById[t.teamId]}
                    alt={`${t.abbreviation} logo`}
                    className="top3-logo"
                  />
                )}

                <div className="top3-text">
                  <div className="top3-name">
                    {t.name} <span className="muted">({t.abbreviation})</span>
                  </div>
                  <div className="muted">
                    {t.wins}-{t.losses} • Win% {Number(t.winPct).toFixed(3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}