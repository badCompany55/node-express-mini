import React from "react";

const User = props => {
  const close = e => {
    props.close(e.target.id);
  };

  return (
    <div className="userCont">
      <i id={props.id} className="fas fa-window-close" onClick={close} />
      <h2 className="name">{props.name}</h2>
      <p className="bio">{props.bio}</p>
    </div>
  );
};

export default User;
