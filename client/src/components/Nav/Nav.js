import * as React from 'react';
import { useCookies } from 'react-cookie';

const Nav = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const authToken = cookies.token;

  const handleSignUp = () => {
    props.setShowAuthModal(true);
    props.setIsSignUp(true);
  };

  const handleLogIn = () => {
    props.setShowAuthModal(true);
    props.setIsSignUp(false);
  };

  const handleLogOut = () => {
    console.log('log me out');
    removeCookie('token', cookies.token);
    window.location.reload(false);
  };

  return (
    <>
      <nav className="main-navigation">
        <h2>Map-App</h2>
        <ul>
          <li>Home</li>
          <li>Profile</li>
        </ul>
        <section className="nav-btn-container">
          {authToken ? (
            <button className="primary-button" onClick={handleLogOut}>
              Sign Out
            </button>
          ) : (
            <button className="primary-button" onClick={handleSignUp}>
              Create Account
            </button>
          )}

          {!authToken && (
            <button className="primary-button" onClick={handleLogIn}>
              Log In
            </button>
          )}
        </section>
      </nav>
      {props.children}
    </>
  );
};

export default Nav;
