import React from 'react';
import DashboardGrid from '../components/DashboardGrid';
import '../style.css';

export default function Home() {
  const nbaLogo = 'https://cdn.nba.com/logos/leagues/logo-nba.svg';

  return (
    <div className='home-page'>
      <div className='home-header'>
        <img src={nbaLogo} alt='NBA logo' className='home-nba-logo' />
        <div>
          <h1 className='home-title'>NBA Dashboard</h1>
          <p className='home-subtitle'>2024-2025 season snapshot</p>
        </div>
      </div>

      <DashboardGrid />
    </div>
  );
}