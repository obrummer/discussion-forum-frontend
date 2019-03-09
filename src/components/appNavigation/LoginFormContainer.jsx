import React from "react";
import { login, register } from "../../API/serviceClient";

import LoginForm from "./LoginForm";

const LoginFormContainer = (props) => {

  const handleLogin = bodyData => {
    login(bodyData).then(
      res => {
        alert("Welcome, " + res.user);
        props.handleLogin(bodyData.username);
        props.history.push("/");
      },
      err => {
        alert(err.message);
      }
    );
  };

  const handleSignup = bodyData => {
    register(bodyData).then(
      res => {
        alert(res.message);
      },
      err => {
        alert(err.message);
      }
    );
  };

  return <LoginForm onLogin={handleLogin} onSignup={handleSignup} />;
};

export default LoginFormContainer;
