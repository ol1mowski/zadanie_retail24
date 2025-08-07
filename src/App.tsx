import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StopwatchApp } from './components/StopwatchApp/StopwatchApp.component';
import { SharedStopwatch } from './components/SharedStopwatch/SharedStopwatch.component';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage.component';
import './index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StopwatchApp />} />
      <Route path="/stopwatch/:id" element={<SharedStopwatch />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
