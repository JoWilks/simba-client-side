import React from 'react'
import './Forms.css'

class AddForm extends React.Component {
  constructor () {
    super()
    this.state = {
      date: '',
      amount: '',
      description: '',
      category: '',
      paymentType: ''
    }
  }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
      event.preventDefault()
    }

    render () {
      return (
        <div id='wrapper'>
          <form id='form'>
            <div className='close-form' onClick={this.props.toggleAddForm}>X</div><br />

            <div>
              <input type='date' name='date' placeholder='Date' onChange={this.handleChange} /> <br />

              <input type='text' name='amount' placeholder='Amount' onChange={this.handleChange} /> <br />

              <input type='text' name='description' placeholder='Description' onChange={this.handleChange} /> <br />

              <input type='text' name='paymentType' placeholder='Cash etc' onChange={this.handleChange} /> <br />

              <select name='category' onChange={this.handleChange}>
                {this.props.categories.map(category =>
                  <option value={category}>{category}</option>
                )}
              </select> <br />

              <input type='submit' value={this.props.categories[0] === 'Eating out' ? 'ADD EXPENSE' : 'ADD INCOME'} />
            </div>
          </form>
        </div>
      )
    }
}

export default AddForm
