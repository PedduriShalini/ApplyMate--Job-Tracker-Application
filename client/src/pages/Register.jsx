import { useState } from "react";
import "./Auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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

      alert("Account created successfully.");

      window.location.href = "/login";
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
            Start organizing
            <br />
            your career.
          </h1>

          <p>
            Create your account and start tracking
            every opportunity from one place.
          </p>

        </div>


        <div className="auth-card">

          <div className="auth-card-header">

            <h2>
              Create an account
            </h2>

            <p>
              It only takes a minute to get started.
            </p>

          </div>


          <form onSubmit={handleRegister}>

            <div className="auth-field">

              <label>
                Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>


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
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            <div className="auth-field">

              <label>
                Confirm password
              </label>

              <input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="auth-button"
            >
              Create account
            </button>

          </form>


          <p className="auth-footer">
            Already have an account?

            <a href="/login">
              Sign in
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;