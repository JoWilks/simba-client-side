import React from 'react'
import './Forms.css';

const timeFrames = ['since two months ago', 'today', 'this week', 'this month', 'between']

class FilterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            category: '',
            timeFrame: '',
            startDate: '',
            endDate:''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
      }

    allowBetweenView = () => {
        this.setState({ betweenDates: true })
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }
    render () {
        return (
            <div id='wrapper'>
                <form id='form'>
                    <div className='close-form' onClick={this.props.toggleFilterForm}>X</div><br />

                    <div>
                    <p>What have I {this.props.categories[0] === 'Eating Out'? "spent on...": "earnt from..."}</p> <br/>
                    
                    <select name='category' onChange={this.handleChange}>
                    <option value='Everything'>Everything</option>
                        {this.props.categories.map(category => 
                            <option value={category}>{category}</option>
                        )}  
                    </select> <br/>
                    <select name='timeFrame' onChange={this.handleChange}>
                        {timeFrames.map(timeFrame => 
                            <option value={timeFrame}>{timeFrame}</option>
                        )}
                    </select> <br/>

                    {
                        this.state.timeFrame === 'between' &&
                        <div>
                        <input type='date' name='startDate' placeholder='start date' onChange={this.handleChange}></input>
                        <input type='date' name='endDate' placeholder='end date' onChange={this.handleChange}></input>
                        </div>
                    }

                    <button type='submit'>FILTER</button>
                    </div>
                </form>
            </div>
        )
    }


}


export default FilterForm