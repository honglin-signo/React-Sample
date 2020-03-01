import React, { Component, Fragment } from "react";
import main from "../main.css";
import { connect } from "react-redux";
import Details from "./Details";
import { fetchImages } from "../actions/actionCreator";

class homePage extends Component {
  state = {
    selectImg: {}
  };

  componentDidMount() {
    this.props.fetchImages();
  }

  handleOnclick = item => {
    this.setState({ selectImg: item });
  };

  ClearSelectedImg = () => {
    this.setState({ selectImg: {} });
  };

  render() {
    const images = this.props.images;
    return (
      <Fragment>
        <header>
          <h1>Technical Exercise</h1>
        </header>
        <div className="all">
          <div className="display">
            <ul>
              {images.map((item, index) => {
                let url = item.download_url.slice(0, -9) + "200";
                //console.log(url)
                return (
                  <li
                    className="img"
                    key={index}
                    onClick={() => this.handleOnclick(item)}
                  >
                    <img src={url} />
                  </li>
                );
              })}
            </ul>
          </div>
          <Details
            item={this.state.selectImg}
            clearSelectedImg={this.ClearSelectedImg}
          />
        </div>
        <footer>
          <h2>Build by Alex</h2>
        </footer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.images
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchImages: () => dispatch(fetchImages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(homePage);
