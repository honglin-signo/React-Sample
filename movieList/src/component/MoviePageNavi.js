import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import {changeSortType, decreasePage, increasePage} from '../actions/actionCreator';
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

class MovieNavi extends Component {
  render() {
    const flags = this.props.typeFlag;
    const title = flags.original_title ? faArrowDown : faArrowUp;
    const vote = flags.vote_count ? faArrowDown : faArrowUp;
    const average = flags.vote_average ? faArrowDown : faArrowUp;
    const date = flags.release_date ? faArrowDown : faArrowUp;
    return (
      <Container>
        <Row className={"sortBar"}>
          <Col><Button variant="secondary" size="sm"
                       onClick={() => this.props.changeSortType('original_title')}>Title <FontAwesomeIcon
            icon={title}/></Button></Col>
          <Col><Button variant="secondary" size="sm" onClick={() => this.props.changeSortType('vote_count')}>Vote
            Count <FontAwesomeIcon
              icon={vote}/></Button></Col>
          <Col><Button variant="secondary" size="sm" onClick={() => this.props.changeSortType('vote_average')}>Average
            Score <FontAwesomeIcon
              icon={average}/></Button></Col>
          <Col><Button variant="secondary" size="sm" onClick={() => this.props.changeSortType('release_date')}>Release
            Data <FontAwesomeIcon
              icon={date}/></Button></Col>
        </Row>
        <Row style={{width: "100%"}} className={'pageBar'}>
          <Col style={{margin:"5px 0 5px 0"}}><Button variant="outline-secondary" size="sm"
                       onClick={() => this.props.decreasePage()}>prevPage</Button></Col>
          <Col style={{margin:"5px 0 5px 0"}}>{this.props.page}/{this.props.totalPage}</Col>
          <Col style={{margin:"5px 0 5px 0"}}><Button variant="outline-secondary" size="sm"
                       onClick={() => this.props.increasePage()}>nextPage</Button></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    sort: state.sort,
    typeFlag: state.typeFlag,
    page: state.page,
    totalPage: state.totalPage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeSortType: (type) => dispatch(changeSortType(type)),
    increasePage: () => dispatch(increasePage()),
    decreasePage: () => dispatch(decreasePage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieNavi)