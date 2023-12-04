import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Account() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const fetchAccount = async () => {
    try {
      const fetchedAccount = await client.account();
      setAccount(fetchedAccount);
    } catch (err) {
      navigate("/kanbas/signin");
    }
  };
  try {
    useEffect(() => {
      if (id) {
        findUserById(id);
      } else {
        fetchAccount();
      }
    }, []);
  } catch (err) {
    navigate("/kanbas/signin");
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const save = async () => {
    await client.updateUser(account);

    // code to display success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  if (!account) {
    navigate("/kanbas/signin");
    return null;
  }
  const signout = async () => {

    await client.signout();

    
    navigate("/kanbas/signin");
  };

  return (
    <div className="container mt-1 ms-2">
      {!id && (
        <h1 className="mt-3" style={{ fontWeight: 200, color: "grey" }}>
          Edit Your Account: {account.username}
        </h1>
      )}

      {id && (
        <h1 className="mt-3" style={{ fontWeight: 200, color: "grey" }}>
          {account.username}'s Account
        </h1>
      )}

      <hr />
      {showSuccess && ( // Display success message if showSuccess is true
        <div className="alert alert-success mt-3" role="alert">
          Account Updated Successfully!
        </div>
      )}
      {account && (
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={account.password}
                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={account.firstName}
                  onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={account.lastName}
                  onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  value={account.dob}
                  onChange={(e) => setAccount({ ...account, dob: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={account.email}
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  value={account.role}
                  onChange={(e) => setAccount({ ...account, role: e.target.value })}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>
            </form>
            {!id && (
              <button className="form-control btn btn-primary" onClick={save}>
                Update Account
              </button>
            )}
            {id && (
              <button disabled="true" className="form-control btn btn-primary" onClick={save}>
                Update Account Disabled. This is not the logged in account.
              </button>
            )}
            <Link to="/kanbas/users" className="form-control btn btn-warning mt-2">
              View All Users
            </Link>
            {!id && (
              <button className="form-control btn btn-danger mt-2" onClick={signout}>
                Signout
              </button>
            )}
            {id && (
              <button
                disabled="true"
                className="form-control btn btn-danger mt-2"
                onClick={signout}
              >
                Sign Out Disabled. This is not the logged in account.
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
