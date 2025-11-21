import React, { useEffect, useState } from 'react';
import axios from 'axios';
import teams from '../data/teams.json';

import teams from '../data/teams.json';

export default function Teams() {
  return (
    <div>
      <h1 className="mb-4">NBA Teams</h1>

      <div className="row">
        {teams.map((team) => (
          <div key={team.teamId} className="col-md-4 mb-3">
            <div className="card p-3 bg-dark text-light">
              <img src={team.logo} alt={team.name} style={{ width: '60px' }} />
              <h4>{team.name}</h4>
              <p>{team.city}</p>
              <p>{team.conference} Conference</p>
              <p>
                Record: {team.wins}-{team.losses}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
