import React from "react";
import User from "./user.js";

const UserList = props => {
  const close = id => {
    props.delete(id);
  };

  return (
    <div className="uListCont">
      {props.users.map(user => {
        return (
          <User
            key={user.id}
            id={user.id}
            name={user.name}
            bio={user.bio}
            close={close}
          />
        );
      })}
    </div>
  );
};

export default UserList;
