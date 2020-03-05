import React, { Component, Fragment } from "react";

export default class Form extends Component {
  state = {
    value: ""
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    alert("Your essay is submit" + this.state.value);
    // e.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            Essay:{" "}
            <textarea
              value={this.state.value}
              onChange={e => this.handleChange(e)}
              placeholder={"Input sth"}
            />
          </label>
          <input type="file"/>>
          <input type="submit" value="Submit" />
        </form>
      </Fragment>
    );
  }
}
