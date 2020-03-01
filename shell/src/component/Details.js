import React, { Component } from "react";
import main from "../main.css";

export default class Details extends Component {
  render() {
    let { item, clearSelectedImg } = this.props;
    let detail;
    if (Object.entries(item).length === 0 && item.constructor === Object) {
      detail = (
        <ul className={"detailList"}>
          <li>No image selected</li>
        </ul>
      );
    } else {
      detail = (
        <ul className={"detailList"}>
          <li>{item.author}</li>
          <li>
            <img className="detailImg" src={item.download_url} />
          </li>
          <li>
            <button onClick={clearSelectedImg}>clear</button>
          </li>
        </ul>
      );
    }
    return <div className="detail">{detail}</div>;
  }
}
