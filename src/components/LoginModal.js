import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ loginShow, setLogin, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 
  const loginUser = () => {
    console.log("In login user!");

    if (!username && !password) {
      return;
    }

    console.log("Login User is being called!");
    axios
      .post("/api/users/login", { username, password })
      .then((res) => {
        console.log("Logged-in User: ", res.data);

        if (res.data.status === "UsernamePasswordIncorrect") {
          return alert(
            "Username or passord incorrect. Please re-enter credentials."
          );
        } else {
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);
          console.log(localStorage.getItem("token"));
          if (res.data.user) {
            setLogin(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error logging-in user!", error);
      });
  };

export default Login;
