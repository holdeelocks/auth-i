import React, { Component } from "react";
import "./App.css";
import UserList from "./components/UserList";
import Header from "./components/Header";
import LoginRegister from "./components/LoginRegister";
import { Route, Link } from "react-router-dom";
import { Button } from "reactstrap";
import { withRouter } from "react-router";

class App extends Component {
  state = {
    showModal: false,
    loggedIn: false
  };

  login = login => {
    this.setState({ loggedIn: login });
  };

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    const { showModal, loggedIn } = this.state;
    return (
      <div className="App">
        <Header onClick={this.toggle} />
        {!loggedIn && (
          <div>
            <h2>Welcome to the Frontend Auth App</h2>

            {!showModal && (
              <Link to="login">
                <Button color="primary" onClick={this.toggle}>
                  Login/Register
                </Button>
              </Link>
            )}
          </div>
        )}

        <Route
          path="/login"
          render={props => (
            <LoginRegister {...props} toggle={this.toggle} modal={showModal} login={this.login} />
          )}
        />
        <Route path="/users" render={props => <UserList {...props} />} />
      </div>
    );
  }
}

export default withRouter(App);
