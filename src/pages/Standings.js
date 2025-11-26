import React from 'react';
import standings from '../data/standings.json';

export default function Standings() {
  const { east, west } = standings;

  return (
    <div>
      <h1>NBA Standings </h1>

      <h2>Eastern Conference</h2>
      <ol>
        {east
          .sort((a, b) => a.conferenceRank - b.conferenceRank)
          .map((team) => (
            <li key={team.teamId}>
              {team.name} ({team.abbreviation}) — 
              {team.wins}-{team.losses}
            </li>
          ))}
      </ol>

      <h2>Western Conference</h2>
      <ol>
        {west
          .sort((a, b) => a.conferenceRank - b.conferenceRank)
          .map((team) => (
            <li key={team.teamId}>
              {team.name} ({team.abbreviation}) — 
              {team.wins}-{team.losses}
            </li>
          ))}
      </ol>
    </div>
  );
}