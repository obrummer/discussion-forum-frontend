import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./LoginForm.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", pwinput: "" };
  }

  handleUserNameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ pwinput: e.target.value });
  };

  handleLogin = e => {
    this.props.onLogin(this.state);
    this.setState({ username: "", pwinput: "" });
  };

  handleSignup = e => {
    this.props.onSignup(this.state);
    this.setState({ username: "", pwinput: "" });
  };

  render() {
    return (
      <Form className="loginForm">
        <Form.Group as={Row} controlId="username">
          <Col sm={4} />
          <Col sm={4}>
            <Form.Control
              type="text"
              onChange={this.handleUserNameChange}
              value={this.state.username}
              placeholder="Username"
              autoComplete="off"
            />
          </Col>
          <Col sm={4} />
        </Form.Group>

        <Form.Group as={Row} controlId="password">
          <Col sm={4} />
          <Col sm={4}>
            <Form.Control
              type="password"
              onChange={this.handlePasswordChange}
              value={this.state.pwinput}
              placeholder="Password"
              autoComplete="off"
            />
          </Col>
          <Col sm={4} />
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={4} />
          <Col sm={4}>
            <Button type="button" onClick={this.handleLogin}>
              Login
            </Button>
            or
            <Button type="button" onClick={this.handleSignup}>
              Create user account
            </Button>
          </Col>
          <Col sm={4} />
        </Form.Group>
      </Form>
    );
  }
}

export default LoginForm;
