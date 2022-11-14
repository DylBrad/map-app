import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MapDisplay from './pages/MapDisplay/MapDisplay';
import Profile from './pages/Profile/Profile';
import NewsFeed from './pages/NewsFeed/NewsFeed';
import Nav from './components/Nav/Nav';

const App = () => {
  // login stuff
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(true);

  return (
    <>
      <BrowserRouter>
        <Nav setIsSignUp={setIsSignUp} setShowAuthModal={setShowAuthModal}>
          <Routes>
            <Route
              path="/"
              element={
                <MapDisplay
                  showAuthModal={showAuthModal}
                  setShowAuthModal={setShowAuthModal}
                  isSignUp={isSignUp}
                  setIsSignUp={setIsSignUp}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/newsfeed" element={<NewsFeed />} />
          </Routes>
        </Nav>
      </BrowserRouter>
    </>
  );
};

export default App;
