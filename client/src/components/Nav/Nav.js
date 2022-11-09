import * as React from 'react';

const Nav = (props) => {
  const authToken = false;

  const handleSignUp = () => {
    props.setShowAuthModal(true);
    props.setIsSignUp(true);
  };

  const handleLogIn = () => {
    props.setShowAuthModal(true);
    props.setIsSignUp(false);
  };

  return (
    <nav>
      {!props.authToken && (
        <button className="primary-button" onClick={handleSignUp}>
          {authToken ? 'Sign Out' : 'Create Account'}
        </button>
      )}

      {!props.authToken && (
        <button className="primary-button" onClick={handleLogIn}>
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
