import React from 'react'
import './Forms.css';

class FilterForm extends React.Component {

    render () {
        return (
            <div id='wrapper'>
                <form id='form'>
                    <h1>Filter</h1>
                    <label>Date: </label>
                    <input type='date'></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }


}


export default FilterForm