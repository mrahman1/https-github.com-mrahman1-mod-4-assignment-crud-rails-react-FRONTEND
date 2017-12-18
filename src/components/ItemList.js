import React from 'react'

class ItemList extends React.Component{
  state={
    id: null,
    name: null,
    quantity: null,
    price: null
  }

  handleDeleteClick = event => {
    this.setState({id: event.target.id})
    this.props.deleteItem(this.state)
    }

  handleEditClick = event => {
    this.setState({id: event.target.id})
    this.props.updateItem(this.state)
  }

  handleShowClick = event => {
      this.props.showItem(event.target.id)
        .then(json => this.setState({
          id: json.id,
          name: json.name,
          quantity: json.quantity,
          price: json.price
        })
      )
  }


  render(){
    const allItems = this.props.items.map(item =>
      <li>
        {item.name}
        <button id = {item.id}
          type = "button"
          onClick = {this.handleDeleteClick}>
          Delete
        </button>
        <button id = {item.id}
          type = "button"
          onClick = {this.handleEditClick}>
          Edit
        </button>
        <button id = {item.id}
          type = "button"
          onClick = {this.handleShowClick}>
          Show More Details
        </button>
        {item.id === this.state.id ?
          <div> <p> Quantity: {this.state.quantity} </p>  <p> Price: {this.state.price} </p> </div>: null
        }
      </li>
    )


    return(
      <div>
        <ul>
            {allItems}
        </ul>
      </div>
    )
  }
}

export default ItemList;
