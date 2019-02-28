import React from "react";
import moment from "moment";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: ""
    };
  }

  capInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    const newUser = { ...this.state };
    newUser.created_at = moment()._d;
    newUser.updated_at = moment()._d;
    this.props.newUser(newUser);
  };

  render() {
    return (
      <div className="formCont">
        <form className="form" onSubmit={this.submit}>
          <div className="name">
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" onChange={this.capInput} />
          </div>
          <div className="bio">
            <label htmlFor="bio">Bio: </label>
            <textarea
              id="bio"
              name="bio"
              cols="30"
              rows="10"
              onChange={this.capInput}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;
