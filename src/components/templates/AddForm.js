import React from 'react'
import './Addform.css';

class AddForm extends React.Component {

    render () {
        return (
            <div id='wrapper'>
                <form id='form'>
                    <h1>Add Transaction</h1>
                    <label>Date: </label>
                    <input type='date'></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }


}


export default AddForm