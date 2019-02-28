import React from "react";
import User from "./user.js";

const UserList = props => {
  return (
    <div className="uListCont">
      {props.users.map(user => {
        return (
          <User key={user.id} id={user.id} name={user.name} bio={user.bio} />
        );
      })}
    </div>
  );
};

export default UserList;
