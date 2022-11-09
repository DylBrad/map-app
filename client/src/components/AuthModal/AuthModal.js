import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createUser } from '../../API';

const AuthModal = (props) => {
  // const [username, setUsername] = React.useState(null);
  // const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    props.setShowAuthModal(false);
    console.log('auth closed clicked');
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (props.isSignUp && password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const created = await createUser(data);
      console.log(created);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ✖
      </div>
      <h2>{props.isSignUp ? 'Create Account' : 'Log In'}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        <label htmlFor="username">Username</label>
        <input {...register('username')} required />

        <label htmlFor="email">Email</label>
        <input type="email" {...register('email')} required />

        <label htmlFor="password">Password</label>
        <input
          {...register('password')}
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {props.isSignUp && (
          <>
            <label htmlFor="password-check">Confirm Password</label>
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="Confirm Password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        <button disabled={loading}>
          {loading ? 'Posting...' : 'Create Account'}
        </button>
        {error ? <h3 className="error">{error}</h3> : null}
      </form>
    </div>
  );
};

export default AuthModal;
