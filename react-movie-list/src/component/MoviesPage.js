import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {changeNavFlag, fetchMovies} from '../actions/actionCreator';
import Navigation from "./Navigation";
import MoviePageNavi from "./MoviePageNavi";
import MovieItem from "./MovieItem";

class moviesPage extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.props.fetchMovies();
    }
  }

  render() {
    const movies = this.props.movies;
    return (
      <div className={"homepage"}>
        <Navigation/>
        <h1 onClick={() => this.props.changeNavFlag()}>Our Top Movies</h1>
        <MoviePageNavi/>
        {
          movies.map((item, index) => {
            return <MovieItem
              item={item}
              index={index}
            />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    page: state.page,
    showNav: state.showNav,
    sort: state.sort
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavFlag: () => dispatch(changeNavFlag()),
    fetchMovies: () => dispatch(fetchMovies())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(moviesPage)