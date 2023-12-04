import React, { useState, useEffect } from "react";
import * as client from "./client";
import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./users.css";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createUser = async () => {
    // if no username/password entered, show error message and return
    if (user.username === "" || user.password === "") {
      setErrorMessage("You must input a username and password!");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }
    try {
      // check if username already exists, if so show error message and return
      const existingUser = users.find((existing) => existing.username === user.username);
      if (existingUser) {
        setShowError(true);
        setErrorMessage("Username already exists. Choose a new one.");
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        return;
      }

      user._id = new Date().getTime();
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
      setUser({ username: "", password: "", firstName: "", lastName: "", role: "USER" });
    } catch (err) {
      console.log("error: " + err);
    }
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    // if no username/password entered, show error message and return
    if (user.username === "" || user.password === "") {
      setErrorMessage("You must input a username and password!");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      return;
    }
    try {
      // make sure _id exists in database, if not show error message and return
      const existingUser = users.find((existing) => existing._id === user._id);
      if (!existingUser) {
        setShowError(true);
        setErrorMessage("No user with that ID exists. Click Add New User instead.");
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        return;
      }

      // now make sure it is not changing username to an existing username that is not itself
      const otherUser = users.find(
        (existing) => existing.username === user.username && existing._id !== user._id
      );
      if (otherUser) {
        setShowError(true);
        setErrorMessage("Username already exists. Choose a new one.");
        setTimeout(() => {
          setShowError(false);
        }, 5000);
        return;
      }
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const fetchedUsers = await client.findAllUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">All Users List</h1>

      <div className="instructions-box mb-2 p-2 pb-0">
        <h4 className="mb-1">
          <strong style={{ textDecoration: "underline" }}>Instructions:</strong>
        </h4>
        <ul>
          <li>
            To{" "}
            <span style={{ color: "green", textDecoration: "underline" }}> add a new user, </span>{" "}
            fill in the Username and Password fields and click{" "}
            <span style={{ color: "green" }}>'Add New User'.</span>
          </li>
          <li>
            To{" "}
            <span style={{ color: "#FFC107", textDecoration: "underline" }}>
              update an existing user,
            </span>{" "}
            select <span style={{ color: "#17A2B8" }}>'Edit This User'</span> from the table and
            modify the fields. Then click{" "}
            <span style={{ color: "#FFC107" }}>'Update Selected User'.</span>
          </li>
          <li>
            To <span style={{ color: "red", textDecoration: "underline" }}>delete a user,</span>{" "}
            click the <span style={{ color: "red" }}>'Delete This User'</span> button beside the
            user in the table.
          </li>
          <li>
            Click on any <span style={{ color: "blue" }}>username</span> to view their profile page.
          </li>
          <li className="mt-2">
            This page would be unavailable from non-admin users, but is visible for the purposes of this project.
          </li>
        </ul>
      </div>

      {showError && ( // Displays error message if showError is true
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>Login Credentials</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
            </tr>
            <tr>
              <td>
                <button className="btn btn-success btn-sm float-start ms-4" onClick={createUser}>
                  Add New User <BsPlusCircleFill />
                </button>
                <button className="btn btn-warning btn-sm float-start ms-3" onClick={updateUser}>
                  Update Selected User <BsFillCheckCircleFill />
                </button>
                <input
                  placeholder="Username (Required)"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input
                  className="ms-2"
                  placeholder="Password (Required)"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </td>
              <td>
                <input
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
              </td>
              <td>
                <input
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
              </td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="STUDENT">Student</option>
                </select>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <button
                    onClick={() => selectUser(user)}
                    className="btn btn-info ms-3 float-start"
                  >
                    Edit This User <BsPencil />
                  </button>
                  <button
                    className="btn btn-danger ms-5 float-start"
                    onClick={() => deleteUser(user)}
                  >
                    Delete This User <BsTrash3Fill />
                  </button>
                  <Link style={{ textDecoration: "none" }} to={`/Kanbas/Account/${user._id}`}>
                    {user.username}
                  </Link>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
