import React from 'react'
import Listview from '../templates/Listview'
import Graphview from '../templates/Graphview'
import Toolbar from '../Toolbar'
import AddForm from '../templates/AddForm'
import FilterForm from '../templates/FilterForm'
import '../templates/Forms.css'

import { moment, today, startDayOfWeek, startDayOfMonth, startDayOfTwoMonthsAgo, convertISOToNiceDate } from '../../datefunctions'


class Debits extends React.Component {
    constructor(props) {
        super(props)
        const transactions = this.props.transactions.debits
        this.state = {
            listView: true,
            addFormView: false,
            filterFormView: false,
            debits: transactions
        }
    }

    toggleListView = () => {
        this.setState({ listView: !this.state.listView })
    }

    toggleAddForm = () => {
        this.setState({ 
            addFormView: !this.state.addFormView,
            filterFormView: false     
        })
    }

    toggleFilterForm = () => {
        this.setState({ 
            filterFormView: !this.state.filterFormView,
            addFormView: false
        })
    }

    filterTransactions = (category, startDate, endDate) => {
       //Filter for transction in a time range and of a specific category
       let debits = JSON.parse(JSON.stringify(this.props.transactions.debits)).reverse()
       let filtered
       if (category === 'everything') {
            filtered =  debits.filter(debit => 
                            moment(debit.settled).isBetween( startDate, endDate ) 
                            // moment(debit.settled).isSameOrAfter(startDate) && moment(debit.settled).isSameOrBefore(endDate))
                        )
       } else {
            filtered = debits.filter(debit => debit.category === category && moment(debit.settled).isSameOrAfter(startDate) && moment(debit.settled).isSameOrBefore(endDate))
       }
       console.log(filtered)
       this.setState({ debits: filtered })
    }

    render () {
        return (
            <div>
                {
                    this.state.addFormView &&
                    <AddForm    categories={this.props.categories.debit} 
                                toggleAddForm={this.toggleAddForm}/>
                }

                {
                    this.state.filterFormView &&
                    <FilterForm categories={this.props.categories.debit}
                                toggleFilterForm={this.toggleFilterForm}
                                filterTransactions={this.filterTransactions}/>
                }

                {
                    //if statement to show either listview or graph
                     this.state.listView ? 
                    <Listview   transactions={this.state.debits}/> :
                    <Graphview transactions={this.state.debits} />
                }

                <div>
                    <Toolbar 
                    toggleListView={this.toggleListView} 
                    listView={this.state.listView}
                    toggleAddForm={this.toggleAddForm} 
                    addFormView={this.state.addFormView}
                    toggleFilterForm={this.toggleFilterForm} 
                    filterFormView={this.state.filterFormView}
                    />
                </div>
                
            </div>
        )
    }


}


export default Debits