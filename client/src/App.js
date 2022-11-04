import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MapDisplay from "./components/MapDisplay";
import OnBoarding from "./components/OnBoarding/OnBoarding";
import Profile from "./components/Profile/Profile";

const App = () => {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapDisplay />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}; 

export default App;
