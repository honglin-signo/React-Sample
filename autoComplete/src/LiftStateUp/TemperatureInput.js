import React, { Component } from "react";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

export default class TemperatureInput extends Component {
  handleOnChange = e => {
    this.props.handleTempChange(e.target.value);
  };

  render() {
    const { temp } = this.props;
    const { scale } = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temp} onChange={this.handleOnChange} />
        {/* <this.BoilingVerdict temp={parseFloat(temp)} /> */}
      </fieldset>
    );
  }
}
