import 'bootstrap/dist/css/bootstrap.min.css';
import main from '../main.css';
import React, {Component, Fragment} from "react";
import { Link } from 'react-router-dom'
import {Button, Col, Nav, Row} from "react-bootstrap";
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {changeNavFlag} from "../actions/actionCreator";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

class Navigation extends Component {
  render() {
    let style;
    if (this.props.showNav) {
      style={width:'80%', marginLeft:'0'}
    } else {
      style={width:'0', marginLeft:'-200px'}
    }
    return (
      <div className={"nav"} style={style}>
        <Nav className="justify-content-center flex-column" style={{height:"40%", left:"25%", position:"relative"}}>
          <Row><Col style={{right:"-40%"}} onClick={() => this.props.changeNavFlag()}><FontAwesomeIcon icon={faWindowClose} /></Col></Row>
          <Link to="/" className={'navItem'}>Home</Link>
          <Link to="/movies" className={'navItem'}>Movies</Link>
          <Link to="/liked" className={'navItem'}>Liked Movies</Link>
          <Link to="/blocked" className={'navItem'}>Blocked Movies</Link>
        </Nav>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    showNav: state.showNav
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavFlag: () => dispatch(changeNavFlag())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)