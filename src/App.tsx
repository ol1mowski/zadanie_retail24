import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StopwatchApp } from './components/StopwatchApp/StopwatchApp.component';
import { SharedStopwatch } from './components/SharedStopwatch/SharedStopwatch.component';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage.component';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import './index.css';

const App: React.FC = () => {
  return (
    <ErrorBoundary resetOnLocationChange={true}>
      <Routes>
        <Route path="/" element={<StopwatchApp />} />
        <Route path="/stopwatch/:id" element={<SharedStopwatch />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
