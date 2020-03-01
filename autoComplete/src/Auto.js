import React, { Component, Fragment } from "react";
import "./main.css";

class App extends Component {
  state = {
    input: ""
  };

  Input = () => {
    return <input placeholder="Input your todo"/>
  }

  render() {
    return (<div>
      <this.Input />
    </div>)
  }
}

export default App;
