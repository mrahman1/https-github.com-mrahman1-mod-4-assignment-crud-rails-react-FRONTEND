import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'

class App extends Component {
  state = {
    items: []
  };

  addItem = (item) => {
    this.setState(previousState => {
      return {
        items: [...previousState.items, item]
      };
    });
  }

  removeItem = (item) => {
    var array = this.state.items;
    var index = array.indexOf(item)
    return this.setState({items: array.splice(index,1)})
  }

  //set state to initial items
  componentWillMount() {
    let url = 'http://localhost:3000/items'
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({items: json}))
  }

  //create new item
  createItem(itemData){
      fetch('http://localhost:3000/items', {
        method: 'post',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })
        .then(res => res.json())
        .then(json => this.addItem(json))
    }

//show single item data
  showItem(id){
    return fetch(`http://localhost:3000/items/${id}`)
      .then(response => response.json())
  }

  //update item
  updateItem(itemData){
      var id = itemData.id;
      fetch(`http://localhost:3000/items/${id}`, {
        method: 'PATCH',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })
        .then(res => res.json())
        .then(console.log)
    }


  deleteItem(item){
      let id = item.id;
      this.removeItem(item);
      fetch(`http://localhost:3000/items/${id}`, {
        method: 'delete'
      })
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ItemForm
          createItem = {this.createItem}
          addItem = {this.addItem}
          />
        <ItemList
          items = {[...this.state.items]}
          deleteItem = {this.deleteItem}
          removeItem = {this.removeItem}
          updateItem = {this.updateItem}
          showItem = {this.showItem}
        />
      </div>
    );
  }
}

export default App;
