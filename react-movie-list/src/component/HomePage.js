import React, {Component, Fragment} from "react";
import Navigation from './Navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import main from '../main.css'
import {changeNavFlag} from "../actions/actionCreator";
import {connect} from "react-redux";

 class homePage extends Component {
   render() {
    return(
      <>
        <Navigation/>
        <div  className={"homepage"}>
          <h1 onClick={() => this.props.changeNavFlag()} style={{marginTop:"30px"}}>Out Top movies <br/>This is first page</h1>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeNavFlag: () => dispatch(changeNavFlag())
  }
};

export default connect(null,mapDispatchToProps)(homePage)