import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {addBlockList, addLikeList} from '../actions/actionCreator';
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";

class MovieItem extends Component {
  checkLikeState = (item) => {
    if (this.props.like.some(movie => movie.id === item.id)) {
      return 'LIKED';
    } else {
      return 'LIKE'
    }
  }

  checkBlockState = (item) => {
    if (this.props.block.some(movie => movie.id === item.id)) {
      return 'none';
    } else {
      return 'block'
    }
  }

  render() {
    const {index, item} = this.props;
    const imgUrl = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;
    const likeState = this.checkLikeState(item);
    const blockState = this.checkBlockState(item);
    return (
      <div style={{textAlign: 'center', backgroundColor: 'gainsboro'}}>
        <ListGroup key={index} className={"group"} style={{display: blockState}}>
          <ListGroupItem className={'list-group-item-secondary'}><img src={imgUrl} alt={"poster"} className={"image"}/></ListGroupItem>
          <ListGroupItem className={'list-group-item-secondary'}>
            <Button size="sm" style={{marginRight: '10px'}}
                    onClick={() => this.props.addLikeList(item)}>{likeState}</Button>
            <Button size="sm" style={{marginRight: '10px'}}
                    onClick={() => this.props.addBlockList(item)}>BLOCK</Button>
          </ListGroupItem>
          <ListGroupItem className={'list-group-item-secondary'}>{item.title}</ListGroupItem>
          <ListGroupItem className={'list-group-item-secondary'}>Release Date: {item.release_date}</ListGroupItem>
          <ListGroupItem className={'list-group-item-secondary'}>vote_count: {item.vote_count} | average: {item.vote_average}/10</ListGroupItem>
          <ListGroupItem className={'list-group-item-secondary'}>{item.overview}</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    like: state.liked,
    block: state.block,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addLikeList: (item) => dispatch(addLikeList(item)),
    addBlockList: (item) => dispatch(addBlockList(item)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)