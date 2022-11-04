import * as React from "react";

const AuthModal = (props) => {
  const handleClick = () => {
    props.setShowAuthModal(false);
    console.log("auth closed clicked");
  };

  return (
    <div>
      <div className="close-icon" onClick={handleClick}>
        ✖
      </div>
    </div>
  );
};

export default AuthModal;
