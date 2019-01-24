import React from "react";

const UserList = ({ users }) => {
  if (users.length === 0) {
    return <div>Please log in or register to see a list of users</div>;
  }
  return (
    <div>
      {users && (
        <div className="users">
          <h3>List of Users:</h3>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
