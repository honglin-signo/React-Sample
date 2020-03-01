import React, {Component, Fragment} from "react";
import TodoItem from './TodoItem';
import ItemOrder from './ItemOrder';
import "./main.css";
import uuid from 'react-uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true,
      searchOrContent: 'content',
      showAll:true,
      showDone:false,
      inputValue:'',
      orderInput:'',
      itemRawData:[],
      searchResult:[]
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.showHeader &&
        <h2>No Todos here</h2>
        }
        {
          !this.state.showHeader &&
          <input
            placeholder={"Search todo item"}
            onChange={this.handleSearchChange}
          />
        }
        {
          this.state.searchOrContent === 'search' &&
          this.state.searchResult.map((item) => {
            return <div key={uuid()} className={"item"}>
              <TodoItem
                item={item}
                handleItemClick={this.handleItemClick}
              />
            </div>
          })
        }
        {
          this.state.searchOrContent === 'content' &&
            this.filterRawData().map((item) => {
              return <div key={uuid()} className={"item"}>
                <ItemOrder
                  item={item}
                  handleIdChange={this.handleIdChange}
                />
                <TodoItem
                  item={item}
                  handleItemClick={this.handleItemClick}
                  handleItemDelete={this.handleItemDelete}
                  handleEdit={this.handleEdit}
                />
              </div>
            })
        }
        {
          !this.state.showHeader &&
        <Fragment>
          <button onClick={this.changeContentFlag}>All</button>
          <button onClick={this.changeContentFlag}>Processing</button>
          <button onClick={this.changeContentFlag}>Done</button>
        </Fragment>
        }
        <input
          className={"input"}
          placeholder={"Input your todo item"}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.pressEnter}
        />
      </Fragment>
    );
  }

  handleEdit = (index, content) => {
    const list = [...this.state.itemRawData];
    list[index].content = content;
    this.setState(() => {
      return {itemRawData: list}
    })
  };

  handleItemDelete = (index)=> {
    const list = [...this.state.itemRawData];
    list.splice(index, 1);
    this.setState(() => {
      return {itemRawData: list}
    })
  }

  handleIdChange = (id,target) => {
    let arr = [...this.state.itemRawData];
    arr[id].orderIndex = target;
    this.setState(() => {
      return {itemRawData: arr}
    })
  };

  handleInputChange = (e) => {
    let value = e.target.value;
    this.setState( () => {
      return {inputValue: value};
    });
  };

  pressEnter = (e) => {
    if (e.keyCode === 13 && this.state.inputValue !== '') {
      let item = {
        content: this.state.inputValue,
        all: true,
        done: false,
        class: 'default',
        orderIndex: 0
      };
      this.setState( (prevState) => {
        return {
          itemRawData: [...prevState.itemRawData, item],
          showHeader: false,
          inputValue: ''
        };
      });
    }
  };

  handleSearchChange = (e) => {
    const value = e.target.value;
    const searchResult = this.searchItem(value);
    this.setState(() => {
      return {
        searchOrContent: 'search',
        searchResult: searchResult
      }
    })
  };

  searchItem = (target) => {
        return this.state.itemRawData.filter( (ele) => {
          return ele.content === target;
        });
  };

  //match item's flag with App's flag
  filterRawData = () => {
    let itemRawData = this.state.itemRawData.map((item, index) => {
      item.id = index;
      return item;
    });
    let arr = [];
    if (this.state.showAll) {
      arr = itemRawData
    } else if (this.state.showDone) {
      arr =  itemRawData.filter( (ele) => {
        return ele.done;
      })
    } else {
      arr = itemRawData.filter( (ele) => {
        return !ele.done;
      })
    }
    arr.sort((a, b) => {return a.orderIndex - b.orderIndex});
    return arr;
  };

  //when click item, change it's color and label it as done item
  handleItemClick = (index) => {
    let arr = this.state.itemRawData;
    arr[index].class = "itemDone";
    arr[index].done = true;
    this.setState(() => {
      return {
        itemRawData: arr
      }
    })
  }

  //change App's flag
  changeContentFlag = (e) => {
    let flag = e.target.innerText;
    let showAll = true;
    let showDone = true;
    if (flag === 'All') {
      showAll = true;
    } else if (flag === 'Processing') {
      showAll = false;
      showDone = false;
    } else if (flag === 'Done') {
      showAll = false;
      showDone = true;
    }
    this.setState(() => {
      return {
        searchOrContent: 'content',
        showAll: showAll,
        showDone: showDone
      }
    })
  }


}

export default App;