import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Message from "./Message";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: false,
      isNameValid: false,
      isPhoneValid: false,
      isUrlValid: false,
      name: "",
      email: "",
      phone: "",
      blog: ""
    };
  }

  handleNameInput = e => {
    let value = e.target.value;

    this.setState({ name: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ email: e.target.value });
  };
  handlePhoneInput = e => {
    this.setState({ phone: e.target.value });
  };
  handleBlogInput = e => {
    this.setState({ blog: e.target.value });
  };

  checkForm = () => {
    let isEmailValid = false;
    let isNameValid = false;
    let isPhoneValid = false;
    let isUrlValid = false;
    let name = this.state.name;
    let letter1 = /[A-Za-z]{3,10}/;
    if (name.match(letter1)) {
      isNameValid = true;
    }

    let email = this.state.email;
    let letter2 = /^\S+@\S+\.\S+$/;
    if (email.match(letter2)) {
      isEmailValid = true;
    }

    let phone = this.state.phone;
    let letter3 = /^[^0-1][0-9]{0,8}[^0-1]$/;
    if (phone.match(letter3)) {
      isPhoneValid = true;
    }

    let blogUrl = this.state.blog;
    let letter4 = /[http:]{0,1}[https:]{0,1}[www]{0,1}[\S]+[\.com]{1}$/;
    if (blogUrl.match(letter4)) {
      isUrlValid = true;
    }

    this.setState({
      isEmailValid: isEmailValid,
      isNameValid: isNameValid,
      isPhoneValid: isPhoneValid,
      isUrlValid: isUrlValid
    });
  };

  render() {
    return (
      <div className="row">
        <h1 className="text-center">Form Validation</h1>
        <form>
          <h3>
            Name:
            <input
              value={this.state.name}
              onChange={e => this.handleNameInput(e)}
              type="text"
            />
          </h3>
          <h3>
            Email:
            <input
              value={this.state.email}
              onChange={e => this.handleEmailInput(e)}
            />
          </h3>
          <h3>
            Phone:{" "}
            <input
              value={this.state.phone}
              onChange={e => this.handlePhoneInput(e)}
            />
          </h3>
          <h3>
            Blog URL:{" "}
            <input
              value={this.state.blog}
              onChange={e => this.handleBlogInput(e)}
            />
          </h3>
          <div className="small-6 small-centered text-center columns">
            <a
              href="#"
              className="button success expand round text-center"
              onClick={this.checkForm}
            >
              Verify
            </a>
          </div>
        </form>

        <Message 
          email = {this.state.isEmailValid}
          name = {this.state.isNameValid}
          phone = {this.state.isPhoneValid}
          url = {this.state.isUrlValid}
        />
      </div>
    );
  }
}

export default Form;
