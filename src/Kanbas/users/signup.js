import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [users, setUsers] = useState([]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const fetchedUsers = await client.findAllUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const signup = async () => {
    // check if username already exists, if so show error message and return.
    const existingUser = users.find((existing) => existing.username === credentials.username);
    if (existingUser) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }

    try {
      await client.signup(credentials);
      navigate("/kanbas/account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const showErrorMessage = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  return (
    <div className="m-3">
      <h1>Signup</h1>
      <h3>Create a Username and Password</h3>
      {showError && ( // Displays error message if showError is true
        <div className="alert alert-danger mt-3" role="alert">
          "Username already exists. Choose a new one."
        </div>
      )}
      {error && <div>{error}</div>}
      <div className="row mt-3">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    username: e.target.value,
                  })
                }
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter a new username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button onClick={signup} type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <div className="mt-2">
              Already have an account?
              <Link className="ms-2" to={`/Kanbas/signin`}>
                Sign In Here{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;