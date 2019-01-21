import React, { Component } from "react";
import "./App.css";
import UserList from "./components/UserList";
import Header from "./components/Header";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Route path="/users" component={UserList} />
      </div>
    );
  }
}

export default App;
