import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import UserList from "./comps/userList.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.initalLoad();
  }

  initalLoad = () => {
    axios
      .get("http://www.localhost:5000/api/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="App">
        <header> Users application</header>
        <Route
          path="/users"
          render={props => <UserList {...props} users={this.state.users} />}
        />
      </div>
    );
  }
}

export default App;
