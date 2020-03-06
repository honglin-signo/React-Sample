import React, { Component, Fragment } from "react";

const MyContext = React.createContext();

const Family = props => {
  return (
    <div>
      <Person />
    </div>
  );
};

class MyProvider extends Component {
  state = {
    name: "Bob",
    age: 100,
    cool: true
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          growOld: () => this.setState({ age: this.state.age + 1 })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class Person extends Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {context => (
            <Fragment>
              <h1>I'm {context.state.name} </h1>
              <h1>I'm {context.state.age} years old</h1>
              <button onClick={context.growOld}>Grow Up</button>
            </Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <MyProvider>
        <div>
          <h1>I'm app</h1>
          <Family />
        </div>
      </MyProvider>
    );
  }
}
