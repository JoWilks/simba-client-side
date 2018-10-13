import React from 'react'
import './Forms.css';

class AddForm extends React.Component {
    constructor() {
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
                    <h1>Add Transaction</h1>

                    <input type='date' name='date' placeholder='Date' onChange={this.handleChange}></input> <br></br>
                    
                    <input type='text' name='amount' placeholder='Amount' onChange={this.handleChange}></input> <br></br>

                    <input type='text' name='description' placeholder='Description' onChange={this.handleChange}></input> <br></br>

                    <input type='text' name='paymentType' placeholder='Cash etc' onChange={this.handleChange}></input> <br></br>
                    
                    <select name='category' onChange={this.handleChange}>
                        {this.props.categories.map(category => 
                            <option value={category}>{category}</option>
                        )}
                    </select> <br></br>

                    <input type='submit' value='SUBMIT' />
                </form>
            </div>
        )
    }


}


export default AddForm