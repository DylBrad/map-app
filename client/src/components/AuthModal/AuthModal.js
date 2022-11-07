import * as React from 'react';

const AuthModal = (props) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [error, setError] = React.useState(null);

  console.log(email, password, confirmPassword);

  const handleClick = () => {
    props.setShowAuthModal(false);
    console.log('auth closed clicked');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (props.isSignUp && password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      console.log('posting', { email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ✖
      </div>
      <h2>{props.isSignUp ? 'Create Account' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {props.isSignUp && (
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="Confirm Password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="primary-button" type="submit" />
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AuthModal;
