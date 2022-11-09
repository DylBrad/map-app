import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MapDisplay from './pages/MapDisplay/MapDisplay';
import Profile from './pages/Profile/Profile';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapDisplay />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
