import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MapDisplay from "./components/MapDisplay";
import Login from "./components/Login/Login";

const App = () => {
  const [token, setToken] = React.useState();

  if (!token) {
    return <Login token={setToken} />
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/mapdisplay" element={<MapDisplay />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}; 

export default App;
