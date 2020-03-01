import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Categories from "./Categories.js";
import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <h3>{"Welcome to Chef Chu's Restaurant"}</h3>
        <Router>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/Categories">
            <button>Categories</button>
          </Link>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Categories" component={Categories} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
