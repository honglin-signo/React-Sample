import React from "react";
import Table from "./Table";
import "./styles.css";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ss: [],
      info: [],
      selected: null,
      selectedIndex: 0
    };
  }

  componentDidMount() {
    fetch(`https://stream-restaurant-menu-svc.herokuapp.com/category/`)
      .then(response => response.json())
      .then(response => {
        for (let obj of response) {
          this.setState({
            list: [...this.state.list, obj.name],
            ss: [...this.state.ss, obj.short_name]
          });
        }
      });
  }

  handleClick = index => {
    this.setState({
      info: []
    });
    fetch(
      `https://stream-restaurant-menu-svc.herokuapp.com/item?category=${this.state.ss[index]}`
    )
      .then(response => response.json())
      .then(response => {
        for (let item of response) {
          let name = item.name,
            description = item.description;
          this.setState({
            info: [...this.state.info, { name, description }]
          });
        }
      });

    this.setState({
      selected: this.state.ss[index],
      selectedIndex: index
    });
  };

  render() {
    return (
      <div>
        <h3>Menu Categories</h3>
        <ul className="restaurant">
          {this.state.list.map((item, index) => {
            return (
              <li key={item} onClick={this.handleClick.bind(this, index)}>
                {item} - ({this.state.ss[index]})
              </li>
            );
          })}
        </ul>
        <Table
          data={this.state.info}
          name={this.state.selected}
          index={this.state.selectedIndex}
        />
      </div>
    );
  }
}

export default Categories;
