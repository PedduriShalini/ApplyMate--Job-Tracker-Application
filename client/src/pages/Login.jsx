import { useState } from "react";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-layout">

        <div className="auth-info">

          <a href="/" className="auth-brand">
            <span className="brand-mark">A</span>
            ApplyMate
          </a>

          <h1>
            Your job search,
            <br />
            without the chaos.
          </h1>

          <p>
            Keep your applications organized and
            know exactly where you stand.
          </p>

        </div>


        <div className="auth-card">

          <div className="auth-card-header">

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to your ApplyMate account.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <div className="auth-field">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            <div className="auth-field">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="auth-button"
            >
              Sign in
            </button>

          </form>


          <p className="auth-footer">
            Don't have an account?

            <a href="/register">
              Create one
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;