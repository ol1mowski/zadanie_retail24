import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StopwatchApp } from './components/StopwatchApp';
import './index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StopwatchApp />} />
      <Route path="/stopwatch/:id" element={<StopwatchApp />} />
    </Routes>
  );
};

export default App;
