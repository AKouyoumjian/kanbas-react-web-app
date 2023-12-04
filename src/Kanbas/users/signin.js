import * as client from "./client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const signin = async () => {
    if (!credentials.username || !credentials.password) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }
    try {
      await client.signin(credentials);
      navigate("/kanbas/Account");
    } catch (err) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    signin();
  };

  return (
    <div className="p-3">
      <h1>Sign in to Your Account</h1>
      {showError && ( // Displays error message if showError is true
        <div className="alert alert-danger mt-3" role="alert">
          "Login unsuccessful. Please try again."
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          className="form-control mx-2"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          className="form-control mx-2"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button
          type="submit" // Set the button type to "submit"
          className="btn btn-primary my-2 ms-2"
        >
          Signin
        </button>

        <div>
          Don't have an account?
          <Link className="ms-2" to={`/Kanbas/signup`}>
            Sign Up Here{" "}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
