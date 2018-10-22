import React from 'react'
import { connect } from 'react-redux'
import './Forms.css'
import { moment } from '../../datefunctions'

// const moment = require('moment');
const timeFrames = ['since two months ago', 'today', 'this week', 'this month', 'between']

class FilterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'everything',
            timeFrame: 'since two months ago',
            startDate: '',
            endDate:'',
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
        const { category, startDate, endDate} =this.state
        const startToday = moment().hour(0).minute(0).second(0)
        const endToday  = moment().hour(23).minute(59).second(59)
        // const moment = require('moment');
        switch (this.state.timeFrame) {
            case 'today':
                this.props.setFilterType(this.state.timeFrame, startToday, endToday, category)
                this.props.filterTransactions(category, startToday, endToday)
                break;
            case 'this week':
            //prob want to store details about what start day of week/month equals etc
                let startDayWeek = moment().day('Monday')
                if (moment().day('Monday').isAfter(endToday)) { 
                    startDayWeek.subtract(7, 'days')
                }
                this.props.setFilterType(this.state.timeFrame, startDayWeek.hour(0).minute(0).second(0), endToday, category)
                this.props.filterTransactions(category, startDayWeek.hour(0).minute(0).second(0), endToday ) //refer start of week from dateReducer
                break;
            case 'this month':
                this.props.setFilterType(this.state.timeFrame, moment().date(1).hour(0).minute(0).second(0), endToday, category)
                this.props.filterTransactions(category, moment().date(1).hour(0).minute(0).second(0), endToday ) //refer start of month from dateReducer
                break;
            case 'since two months ago':
                this.props.setFilterType(this.state.timeFrame, moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0), endToday, category)
                this.props.filterTransactions(category, moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0), endToday)
                break;
            case 'between':
                const start = moment(startDate).startOf('day')
                const end = moment(endDate).endOf('day')
                this.props.setFilterType(this.state.timeFrame, start, end, category)
                this.props.filterTransactions(category, start, end)
                break;
        }
        this.props.toggleFilterForm()
    }

    render () {
        let descriptionFilter

        switch(this.props.views.currentView) {
            case 'Expenses':
                 descriptionFilter = "What have I spent on..."
                 break;
            case 'Income':
                 descriptionFilter = "What have I earnt in..."
                 break;
            case 'Net':
                 descriptionFilter = "Filter Net by"
                 break;
            default:
                 descriptionFilter = "Filter"
                 break;
        }

        let categoryFilter = this.props.categories ? 
                (
                <select name='category' onChange={this.handleChange}>
                <option value='everything'>everything</option>
                        {
                            this.props.categories.map(category => 
                        <option value={category} key={category}>{category}</option>
                        )}
                </select>)
            : null

        



        return (
            <div id='wrapper'>
                <form id='form' onSubmit={(event) => this.handleSubmit(event)}>
                    <div className='close-form' onClick={this.props.toggleFilterForm}>X</div><br />

                    <div>
                    <p>{descriptionFilter}</p> <br/>
                        {categoryFilter} <br />
                    <select name='timeFrame' onChange={this.handleChange}>
                        {timeFrames.map(timeFrame => 
                            <option value={timeFrame} key={timeFrame}>{timeFrame}</option>
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

const mapStateToProps = state => ({
    views: state.viewsReducer
})

export default connect(mapStateToProps, null)(FilterForm)