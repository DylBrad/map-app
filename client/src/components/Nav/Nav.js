import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { IconContext } from 'react-icons';
import { GrMapLocation } from 'react-icons/gr';
import { FaUserAlt } from 'react-icons/fa';
import { CgFeed } from 'react-icons/cg';
import AuthModal from '../../components/AuthModal/AuthModal';

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
        <div className="nav-top-section">
          <h1>Map-App</h1>
          <ul>
            <IconContext.Provider
              value={{ className: 'react-icons', size: 24 }}
            >
              <NavLink to="/">
                <li>
                  <GrMapLocation value={{ className: 'react-icons' }} />
                  <span>Home</span>
                </li>
              </NavLink>
              <NavLink to="/newsfeed">
                <li>
                  <CgFeed value={{ className: 'react-icons' }} />
                  <span>News Feed</span>
                </li>
              </NavLink>
              {authToken && (
                <NavLink to="/profile">
                  <li>
                    <FaUserAlt value={{ className: 'react-icons' }} />
                    <span>Profile</span>
                  </li>
                </NavLink>
              )}
            </IconContext.Provider>
          </ul>
        </div>
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
      {props.showAuthModal && (
        <AuthModal
          setShowAuthModal={props.setShowAuthModal}
          isSignUp={props.isSignUp}
          setIsSignUp={props.setIsSignUp}
        />
      )}
      {props.children}
    </>
  );
};

export default Nav;
