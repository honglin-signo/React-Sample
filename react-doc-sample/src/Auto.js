import React, { Component, Fragment } from "react";
import "./main.css";

class App extends Component {
  state = {
    data: [
      { name: "apple", id: "001" },
      { name: "ace", id: "002" },
      { name: "test", id: "003" },
      { name: "green", id: "004" },
      { name: "yellow", id: "005" }
    ],
    filteredDate: [],
    value: ""
  };

  Input = () => {
    return <input placeholder="Input your todo" />;
  };

  handleOnClick = item => {
    this.setState({ value: item.name });
  };

  handleOnChange = e => {
    const data = this.state.data;
    const value = e.target.value;
    const filteredDate = data.filter(
      option => option.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.setState({ value: value, filteredDate: filteredDate });
  };

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={e => this.handleOnChange(e)}
        />
        <ul>
          {this.state.filteredDate.map((item, index) => {
            return (
              <li key={index} onClick={() => this.handleOnClick(item)}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
