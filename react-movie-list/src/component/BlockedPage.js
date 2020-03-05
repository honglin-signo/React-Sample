import React, {Component} from "react";
import {connect} from 'react-redux';
import {removeBlockList, addLikeList, changeNavFlag} from '../actions/actionCreator';
import Navigation from "./Navigation";
import {Button} from "react-bootstrap";
import {faEllipsisH, faHeart, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import main from '../main.css'
import MovieDetail from "./MovieDetail";
import 'bootstrap/dist/css/bootstrap.min.css';

class blockedPage extends Component {
  state={
    detail:'none'
  }

  changeDetail = () => {
    const newDetail = this.state.detail === 'none' ? 'block' : 'none';
    this.setState({detail: newDetail})
  }

  render() {
    const movies = this.props.block;
    return (
      <div className={"homepage"}>
        <Navigation/>
        <h1 onClick={() => this.props.changeNavFlag()} style={{marginTop:"30px"}}>Blocked Movies</h1>
        {
          movies.map((item, index) => {
            const imgUrl = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;
            return (
              <div className={"subItem"} key={index}>
                <img src={imgUrl} alt={"poster"} style={{width:"100%"}} className={"image"}/>
                <div>
                  <Button size={"sm"} variant="outline-secondary" style={{marginRight:"10px"}} onClick={() => this.props.removeBlockList(item)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                  <Button size={"sm"} variant="outline-secondary" style={{marginRight:"10px"}} onClick={() => this.props.addLikeList(item)}><FontAwesomeIcon icon={faHeart} /></Button>
                  <Button size={"sm"} variant="outline-secondary" onClick={() => this.changeDetail()}><FontAwesomeIcon icon={faEllipsisH} /></Button>
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
    block: state.block
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeNavFlag: () => dispatch(changeNavFlag()),
    addLikeList: (item) => dispatch(addLikeList(item)),
    removeBlockList: (item) => dispatch(removeBlockList(item))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(blockedPage)