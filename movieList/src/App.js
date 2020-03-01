import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import HomePage from "./component/HomePage";
import MoviesPage from "./component/MoviesPage";
import LikedPage from "./component/LikedPage";
import BlockedPage from "./component/BlockedPage";

export default class App extends Component{
  render() {
    return(
      <Router>
          <Route exact path="/" ><HomePage/></Route>
          <Route exact path="/movies"><MoviesPage/></Route>
          <Route exact path="/liked"><LikedPage/></Route>
          <Route exact path="/blocked"><BlockedPage/></Route>
      </Router>
    )
  }
}