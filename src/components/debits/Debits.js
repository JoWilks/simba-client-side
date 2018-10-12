import React from 'react'
import Listview from '../templates/Listview'
import Graphview from '../templates/Graphview'
import Toolbar from '../Toolbar'
import AddForm from '../templates/AddForm'
import FilterForm from '../templates/FilterForm'
import '../templates/Forms.css'

class Debits extends React.Component {

    //need either a state here or in redux to flick show List or Graph
    //need to modal render an add form on change of state
    //modal to render filter form
    state = {
        listView: true,
        addFormView: false,
        filterFormView: false
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

    render () {
        return (
            <div>
                <h1>Expenses</h1>

                {
                    this.state.addFormView &&
                    <AddForm />
                }

                {
                    this.state.filterFormView &&
                    <FilterForm />
                }

                {
                    //if statement to show either listview or graph
                     this.state.listView ? 
                     <Listview transactions={this.props.transactions.debits} /> :
                    <Graphview transactions={this.props.transactions.debits} />
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