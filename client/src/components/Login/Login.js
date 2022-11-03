import * as React from 'react';

const Login = () => {
  return(
    <div>
      <h2>Log In</h2>
      <form>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
          <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
