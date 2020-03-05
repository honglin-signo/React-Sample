import React, { Component } from "react";
import TemperatureInput from "./TemperatureInput";
import { configure } from "@testing-library/react";

export default class TemperatureCalculate extends Component {
  state = { temp: "", scale: "c" };

  handleCelsiusChange = temperature => {
    // console.log(temperature.toString());
    this.setState({ temp: temperature, scale: "c" });
  };

  handleFahrenheitChange = temperature => {
    this.setState({ temp: temperature, scale: "f" });
  };

  toCelsius = fahrenheit => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  toFahrenheit = celsius => {
    return (celsius * 9) / 5 + 32;
  };

  convert = (temp, convertFun) => {
    const input = parseFloat(temp);
    if (isNaN(input)) {
      return "";
    }
    const output = convertFun(input);
    const round = Math.round(output * 1000) / 1000;
    return round.toString();
  };

  BoilingVerdict = props => {
    if (props.temp >= 100) {
      return <div>This water would boil.</div>;
    }
    return <div>This water would not boil.</div>;
  };

  render() {
    const scale = this.state.scale;
    const temp = this.state.temp;
    const celsius = scale === "f" ? this.convert(temp, this.toCelsius) : temp;
    const fahrenheit =
      scale === "c" ? this.convert(temp, this.toFahrenheit) : temp;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temp={celsius}
          handleTempChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temp={fahrenheit}
          handleTempChange={this.handleFahrenheitChange}
        />
        <this.BoilingVerdict temp={parseFloat(celsius)} />
      </div>
    );
  }
}
