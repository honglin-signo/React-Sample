import React, { Component } from "react";

export default class Doc extends Component {
  state = { isLogIn: false };

  // UserGreeting = props => {
  //   return <h1>Welcome Back!</h1>;
  // };

  // GuestGreeting = props => {
  //   return <h1>Please Log In</h1>;
  // };

  // Greeting = props => {
  //   const isLogIn = this.state.isLogIn;
  //   if (isLogIn) {
  //     return <this.UserGreeting />;
  //   }
  //   return <this.GuestGreeting />;
  // };

  // LogInButton = props => {
  //   return <button onClick={this.LogClick}>LogIn</button>;
  // };

  // LogOutButton = props => {
  //   return <button onClick={this.LogClick}>LogOut</button>;
  // };

  // LogClick = () => {
  //   this.setState(state => ({ isLogIn: !state.isLogIn }));
  // };

  mailBox = props => {
    return (
      props.message.length > 0 && (
        <h2>You have {props.message.length} unread messages</h2>
      )
    );
  };
  render() {
    // let button;
    // const isLogIn = this.state.isLogIn;
    // if (!isLogIn) {
    //   button = <this.LogInButton />;
    // } else {
    //   button = <this.LogOutButton />;
    // }

    const message = ["aaa", "bbb", "ccc"];
    return (
      <div>
        <this.mailBox message={message} />
        {/* <this.Greeting />
        {button} */}
      </div>
    );
  }
}
