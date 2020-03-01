import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default class MovieDetail extends Component {
  render() {
    const {display, changeDetailFlage, item} = this.props;
    const imgUrl = 'https://image.tmdb.org/t/p/w500/' + item.poster_path;
    return (
      <>
        <div className={'overlay'} style={{display: display}}>
          <Button className={'close'} variant="outline-danger" size='lg' onClick={()=> changeDetailFlage()}><FontAwesomeIcon icon={faWindowClose}/></Button>
        </div>
        <div className={'content'} style={{display: display}}>
          <ul className={'detailGroup'}>
            <li><img src={imgUrl} alt={"poster"} className={"image"}/></li>
            <li>{item.title}</li>
            <li>Release Date: {item.release_date}</li>
            <li>vote_count: {item.vote_count} | average: {item.vote_average}/10</li>
            <li>{item.overview}</li>
          </ul>
        </div>
      </>
    )
  }
}