import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const NoteDetail = lazy(() => import('./pages/NoteDetail'));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;