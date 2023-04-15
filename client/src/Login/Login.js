import "./Login.css";

function Login() {
  return (
    <div className="App">
      <div className="App-body">
        <div className="login-section">
          <form>
            <input
              type="text"
              placeholder="E-mail or username"
              className="input input-bordered input-accent w-full max-w-xs"
            /><br/>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-accent w-full max-w-xs mt-5"
            />
            <div className="grid h-20 card rounded-box place-items-center">
              <button className="btn btn-success">Login</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="register-section">
            <form action="/chat">
              <input
                type="text"
                placeholder="E-mail"
                className="input input-bordered input-success w-full max-w-xs"
              /><br/>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered input-success w-full max-w-xs mt-5"
              />
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered input-success w-full max-w-xs mt-5"
              />
              <div className="grid h-20 card rounded-box place-items-center">
                <button className="btn btn-info" type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
