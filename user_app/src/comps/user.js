import React from "react";

const User = props => {
  return (
    <div className="userCont">
      <h2 className="name">{props.name}</h2>
      <p className="bio">{props.bio}</p>
    </div>
  );
};

export default User;
