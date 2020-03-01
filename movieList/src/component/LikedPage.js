import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {addBlockList, changeNavFlag, removeLikeList} from '../actions/actionCreator';
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBan, faEllipsisH, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import MovieDetail from "./MovieDetail";

class likedPage extends Component {
  state={
    detail:'none'
  }

  changeDetail = () => {
    const newDetail = this.state.detail === 'none' ? 'block' : 'none';
    this.setState({detail: newDetail})
  }

  render() {
    const movies = this.props.liked;
    return(
      <div className={"homepage"} >
        <Navigation/>
        <h1 onClick={() => this.props.changeNavFlag()} style={{marginTop:"30px"}}>Liked Movies</h1>
        {
          movies.map((item, index) => {
            const imgUrl = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;
            return (
              <div>
              <div className={"subItem"} key={index}>
              <img src={imgUrl} alt={"poster"} style={{width:"100%"}} className={"image"}/>
                  <div >
                  <Button size={"sm"} variant="outline-secondary" style={{marginRight:"10px"}} onClick={() => this.props.removeLikeList(item)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                  <Button size={"sm"} variant="outline-secondary" style={{marginRight:"10px"}} onClick={() => this.props.addBlockList(item)}><FontAwesomeIcon icon={faBan} /></Button>
                  <Button size={"sm"} variant="outline-secondary" onClick={() => this.changeDetail()}><FontAwesomeIcon icon={faEllipsisH} /></Button>
                  </div>
              </div>
                <MovieDetail
                  item={item}
                  display={this.state.detail}
                  changeDetailFlage={this.changeDetail}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    liked: state.liked
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavFlag: () => dispatch(changeNavFlag()),
    addBlockList: (item) => dispatch(addBlockList(item)),
    removeLikeList: (item) => dispatch(removeLikeList(item))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(likedPage)