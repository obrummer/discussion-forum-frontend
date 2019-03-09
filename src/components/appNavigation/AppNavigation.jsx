import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AppNavigation.css";

const AppNavigation = props => {
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand>HipsteriDevskulit, welcome {props.user || "Guest"}!</Navbar.Brand>
        <Nav className="mr-auto" />
        <Link to="/">
          <Button variant="primary" to="/">
            Home
          </Button>
        </Link>
        {props.user ? (
          <Button variant="primary" onClick={props.handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        )}
        <Link to="/profile">
          <Button variant="secondary">Profile</Button>
        </Link>
      </Navbar>
    </div>
  );
};

export default AppNavigation;
