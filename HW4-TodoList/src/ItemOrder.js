import React, {Component, Fragment} from "react";
import "./main.css";

class itemOrder extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue: this.props.item.orderIndex
    }
  }

  render() {
    return(
      <Fragment>
        <input
               type={"number"}
               value={this.state.inputValue}
               onChange={this.handleInputChange}
               onKeyDown={this.handleEnter}
        />
      </Fragment>
    )
  }

  handleInputChange = (e) => {
    const target = e.target.value;
    this.setState(() => {
      return {inputValue: target};
    })
  };

  handleEnter = (e) => {
    const {handleIdChange, item} = this.props;
    if (e.keyCode === 13 && this.state.inputValue != null) {
       handleIdChange(item.id, this.state.inputValue);
    }
  }

}

export default itemOrder;