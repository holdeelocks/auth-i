import React, { Component } from "react";
import axios from "axios";

class Userlist extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    console.log("ok");

    axios
      .get("http://localhost:5000/api/restricted/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { users } = this.state;
    if (!users) {
      return <div>Please log in or register to see a list of users</div>;
    }
    return (
      <div>
        {users && (
          <div className="users">
            {users.map((user, i) => (
              <li key={i}>{user.username}</li>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Userlist;
