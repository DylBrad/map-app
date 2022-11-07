import * as React from 'react';

const LoginButton = (props) => {
  const handleClick = () => {
    props.setShowAuthModal(true);
    props.setIsSignUp(false);
  };

  return (
    <>
      <button
        className="primary-button"
        onClick={handleClick}
        disabled={props.showAuthModal}
      >
        Log In
      </button>
    </>
  );
};

export default LoginButton;
