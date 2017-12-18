import React from 'react'

class ItemForm extends React.Component{

    state={
      name: ""
    }

  handleChange = event => {
    this.setState({name: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.createItem(this.state)
  }

  render(){
    return(
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type = "text"
            placeholder = "Add New Item Here"
            onChange = {this.handleChange}
            value = {this.state.name}
          />
          <input
            type = "submit"
            placeholder = "Submit"
          />
        </form>
      </div>
    )
  }
}

export default ItemForm;
