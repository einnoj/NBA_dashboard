import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import Players from './pages/Players';
import Top5 from './pages/Top5';
import Standings from './pages/Standings';
import Teams from './pages/Teams';
import './style.css';

// used the slides as a reference
export default function App() {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/top5" element={<Top5 />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </main>
    </div>
  );
}
