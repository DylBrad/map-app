import * as React from 'react';

const Nav = (props) => {
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
      <button className="primary-button" onClick={handleSignUp}>
        {props.authToken ? 'Sign Out' : 'Create Account'}
      </button>

      {!props.authToken && (
        <button
          className="primary-button"
          onClick={handleLogIn}
          disabled={props.showAuthModal}
        >
          Log In
        </button>
      )}
    </nav>
  );
};

export default Nav;
