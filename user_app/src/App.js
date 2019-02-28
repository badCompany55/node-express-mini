import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import UserList from "./comps/userList.js";
import Form from "./comps/form.js";

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

  addUser = user => {
    axios
      .post(`http://www.localhost:5000/api/users`, user)
      .then(res => {
        let newUsers = this.state.users.slice();
        newUsers.push(user);
        this.setState({ users: newUsers });
      })
      .catch(err => {
        console.log(err);
      });
  };

  delete = id => {
    axios
      .delete(`http://www.localhost:5000/api/users/${id}`)
      .then(res => {
        const users = this.state.users.slice();
        let deleted = users.filter(user => {
          if (user.id !== Number(res.data.success)) {
            return user;
          }
        });
        console.log(deleted);
        this.setState({ users: deleted });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    {
      console.log(this.state.users);
    }
    return (
      <div className="App">
        <header> Users application</header>
        <Route
          exact
          path="/users"
          render={props => (
            <UserList
              {...props}
              users={this.state.users}
              delete={this.delete}
            />
          )}
        />
        <Route
          path="/new"
          render={props => <Form {...props} newUser={this.addUser} />}
        />
      </div>
    );
  }
}

export default App;
