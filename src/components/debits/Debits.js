import React from 'react'
import Listview from '../templates/Listview'
import Graphview from '../templates/Graphview'
import Toolbar from '../Toolbar'

class Debits extends React.Component {

    //need either a state here or in redux to flick show List or Graph
    //need to modal render an add form on change of state
    //modal to render filter form
    state = {
        listView: true
    }

    toggleListView = () => {
        this.setState({ listView: !this.state.listView })
    }

    toggleAddForm = () => {
        
    }

    toggleFilterForm = () => {

    }

    render () {
        return (
            <div>
                <h1>Expenses</h1>
                {
                    //if statement to show either listview or graph
                     this.state.listView ? 
                     <Listview transactions={this.props.transactions.debits} /> :
                    <Graphview transactions={this.props.transactions.debits} />
                }

                <div>
                    <Toolbar toggleListView={this.toggleListView} listView={this.state.listView}/>
                </div>
                
            </div>
        )
    }


}


export default Debits