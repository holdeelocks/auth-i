import React, { Component } from "react";
import axios from "axios";

class Userlist extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    try {
      const users = await axios.get("http://localhost:5000/api/users");
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        {users && (
          <div>
            {users.map(user => (
              <li>{user.username}</li>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Userlist;
