import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppNavigation from "./components/appNavigation/AppNavigation";
import SelectionView from "./components/selectionView/SelectionView";
import LoginFormContainer from "./components/appNavigation/LoginFormContainer";
import Profile from "./components/appNavigation/Profile";
import DiscussionView from "./components/discussionView/DiscussionView";
import PageNotFound from "./components/PageNotFound";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("auth") && localStorage.getItem("name")) {
      this.state = { logged: true, user: localStorage.getItem("name") };
    } else {
      this.state = { logged: false, user: "" };
    }
  }

  onLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("name");
    this.setState({ logged: false, user: "" });
  };

  onLogin = name => {
    this.setState({ logged: true, user: name });
  };

  render() {
    return (
      <Router>
        <div>
          <AppNavigation user={this.state.user} handleLogout={this.onLogout} />
          <Switch>
            <Route exact path="/" component={SelectionView} />
            <Route path="/login" render={props => <LoginFormContainer {...props} handleLogin={this.onLogin} />} />
            <Route path="/profile" component={Profile} />
            <Route path="/discussion/:id" component={DiscussionView} />
            <Route path="**" component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
