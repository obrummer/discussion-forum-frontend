import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavigation from "./components/appNavigation/AppNavigation";
import SelectionView from "./components/selectionView/SelectionView";
import LoginForm from "./components/appNavigation/LoginForm";
import SignupForm from "./components/appNavigation/SignupForm";
import Profile from "./components/appNavigation/Profile";
import DiscussionView from "./components/discussionView/DiscussionView";
import PageNotFound from "./components/PageNotFound";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logged_in: false, user: "" };
    this.userLogin = this.userLogin.bind(this);
    this.userLogout = this.userLogout.bind(this);
  }

  userLogin(name) {
    this.setState({ logged_in: true, user: name });
  }

  userLogout() {
    localStorage.clear();
    this.setState({ logged_in: false, user: "" });
  }

  render() {
    return (
      <Router>
        <div>
          <AppNavigation
            userAuth={this.state.logged_in}
            userName={this.state.user}
            onLogout={this.userLogout}
          />
          <Switch>
            <Route exact path="/" component={SelectionView} />
            <Route
              path="/login"
              render={props => (
                <LoginForm {...props} onLogin={this.userLogin} />
              )}
            />
            <Route path="/signup" component={SignupForm} />
            <Route path="/profile" component={Profile} />
            <Route
              path="/discussion/:id"
              render={props => (
                <DiscussionView {...props} isAuth={this.state.logged_in} />
              )}
            />
            <Route path="**" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
