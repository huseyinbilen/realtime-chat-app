import "./Login.css";

function Login() {
  const loginMethod = (e) => {
    e.preventDefault();
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-pass").value;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch("http://localhost:3001/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Token storage
        document.cookie = `token=${data.data.token}; expires=${new Date(new Date().setFullYear(new Date().getFullYear() + 1))}; path=/`;
      });
  };

  return (
    <div className="App">
      <div className="App-body">
        <div className="login-section">
          <form onSubmit={loginMethod}>
            <input
              id="login-email"
              type="text"
              placeholder="E-mail"
              className="input input-bordered input-accent w-full max-w-xs"
            />
            <br />
            <input
              id="login-pass"
              type="password"
              placeholder="Password"
              className="input input-bordered input-accent w-full max-w-xs mt-5"
            />
            <div className="grid h-20 card rounded-box place-items-center">
              <button className="btn btn-success" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="register-section">
            <form onSubmit={registerMethod}>
              <input
                id="register-email"
                type="text"
                placeholder="E-mail"
                className="input input-bordered input-success w-full max-w-xs"
              />
              <br />
              <input
                id="register-username"
                type="text"
                placeholder="Username"
                className="input input-bordered input-success w-full max-w-xs mt-5"
              />
              <input
                id="register-pass"
                type="password"
                placeholder="Password"
                className="input input-bordered input-success w-full max-w-xs mt-5"
              />
              <div className="grid h-20 card rounded-box place-items-center">
                <button className="btn btn-info" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
