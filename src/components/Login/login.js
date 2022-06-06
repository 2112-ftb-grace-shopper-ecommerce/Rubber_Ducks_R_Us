import React, { useEffect, useState } from "react";
import { login } from "../../axios-services/user";
import "./loginStyle.css"
import { Link } from "react-router-dom";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const userToLogin = {
    username: loginUsername,
    password: loginPassword,
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const waitLogin = await login(userToLogin);
    if (!waitLogin) alert("Error logging in. Please try again");
    setLoginUsername("");
    setLoginPassword("");
    window.location.reload(false);
  };

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    window.location.reload(false);
    }

  useEffect(() => {
    const getToken = localStorage.getItem("token") ? true : false;
    setIsLoggedIn(getToken);
  }, []);

  return (
    <div className="loginPage">
      <form className="loginSection" onSubmit={handleLogin}>
        <h2>Log In</h2>
        <label>Username</label>
        <br />
        <input
          type={"text"}
          value={loginUsername}
          onChange={(event) => {
            setLoginUsername(event.target.value);
          }}
        />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input
          type={"password"}
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br />
        <br />
        <button id="loginButton">Log In</button>

        <button className="loginButtons" onClick={(event) => {
            event.preventDefault()
            logout();
        }}>Logout</button>
      </form>
      <div className="registerSection">
        <h2>No Account Yet?</h2>
        <Link to='/register'>
        <button id="registerButton">Register New Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
