import React, {Component, Fragment} from "react";
import "./main.css";
class todoItem extends Component{
  constructor(props) {
    let a = 1;
    super(props);
    this.state = {
      showEdit: false,
      content: this.props.item.content,
      original: this.props.item.content
    }
  }
  render() {
    const {item} = this.props;
    return(
        <Fragment>
          {
            !this.state.showEdit &&
              <Fragment>
              <div onClick={this.itemIsDone} className={item.class}>{this.state.content}</div>
              <button  onClick={this.handleEdit}>Edit</button>
              </Fragment>
          }
          {
            this.state.showEdit &&
              <Fragment>
              <input value={this.state.content} onChange={this.editOnchange}/>
              <button onClick={this.saveEdit}>Save</button>
              <button onClick={this.cancelEdit}>Cancel</button>
              </Fragment>
          }
          <button  onClick={this.handleClick}>Delete</button>
        </Fragment>
      )
  }

  saveEdit = () => {
    const {item, handleEdit} = this.props;
    handleEdit(item.id, this.state.content);
    this.setState(() => {
      return {showEdit: false}
    })
  };

  cancelEdit = () => {
    const {item, handleEdit} = this.props;
    handleEdit(item.id, this.state.original);
    this.setState(() => {
      return {showEdit: false}
    })
  }
  itemIsDone = () => {
    const {handleItemClick, item} = this.props;
    handleItemClick(item.id);
  };

  handleClick = () => {
    const {handleItemDelete, item} = this.props;
    handleItemDelete(item.id);
  }

  handleEdit = () => {
    this.setState(() => {return {showEdit: true}})
  }

  editOnchange = (e) => {
    const target = e.target.value;
    this.setState(() => {
      return {content: target}
    })
  }
}

export default todoItem;