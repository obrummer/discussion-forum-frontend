import React, { Component } from "react";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange = e => {
    const uusiarvo = e.target.value;
    this.setState({ username: uusiarvo });
  };
  handlePasswordChange = e => {
    const uusiarvo = e.target.value;
    this.setState({ password: uusiarvo });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.state.username || !this.state.password) {
      alert("Please fill both username and password");
    }
    try {
      let response = await fetch("/api/users", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      });
      let jsonRes = await response.json();
      if (jsonRes.success) {
        alert("" + jsonRes.msg);
        this.props.history.push("/");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("User creation failed!");
      this.setState({ username: "", password: "" });
    }
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Username"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <br />
        <input
          type="submit"
          value="Create Account"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default SignupForm;
