// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import BigBoard from './components/BigBoard';
import PlayerProfile from './components/PlayerProfile';
import ComparePage from './components/ComparePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BigBoard />} />
      <Route path="/player/:playerId" element={<PlayerProfile />} />
      <Route path="/compare" element={<ComparePage />} />
    </Routes>
  );
}

export default App;
