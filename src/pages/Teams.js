// Teams.js
import React, { useMemo, useState } from "react";
import teams from "../data/teams.json";
import TeamRecordDonut from "../components/TeamRecord";
import "../style.css";

function TeamsHeader({ total }) {
  return (
    <div className="teams-header">
      <h1>NBA Teams</h1>
      <p className="muted">{total} teams</p>
    </div>
  );
}

function TeamsFilters({ query, setQuery, conference, setConference }) {
  return (
    <div className="teams-filters">
      <input
        className="teams-search"
        placeholder="Search team or city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        className="teams-select"
        value={conference}
        onChange={(e) => setConference(e.target.value)}
      >
        <option value="ALL">All Conferences</option>
        <option value="East">Eastern</option>
        <option value="West">Western</option>
      </select>
    </div>
  );
}

function TeamCard({ team }) {
  return (
    <div className="team-card">
      <img src={team.logo} alt={team.name} className="team-logo" />
      <h4>{team.name}</h4>
      <p>{team.city}</p>
      <p className="muted">{team.conference}ern Conference</p>
      <TeamRecordDonut team={team} />
      <p><strong>Record:</strong> {team.wins}-{team.losses}</p>
    </div>
  );
}

function TeamsGrid({ teams }) {
  return (
    <div className="teams-cards-grid">
      {teams.map((t) => <TeamCard key={t.teamId} team={t} />)}
    </div>
  );
}

export default function Teams() {
  const [query, setQuery] = useState("");
  const [conference, setConference] = useState("ALL");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return teams
      .filter((t) => {
        const matchesText =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q);

        const matchesConf = conference === "ALL" || t.conference === conference;

        return matchesText && matchesConf;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, conference]);

  return (
    <div className="teams-page">
      <TeamsHeader total={filtered.length} />
      <TeamsFilters
        query={query}
        setQuery={setQuery}
        conference={conference}
        setConference={setConference}
      />
      <TeamsGrid teams={filtered} />
    </div>
  );
}