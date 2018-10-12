import React from 'react'
import { Link } from 'react-router-dom'
import './Toolbar.css'

class Toolbar extends React.Component {
  render () {
    return (
        <div className='toolbar'>
        <footer className='footer'>
            <button onClick={this.props.toggleFilterForm}>Filter</button>
            <button onClick={this.props.toggleAddForm}>Add</button>
            <button onClick={this.props.toggleListView}>{this.props.listView? "Graph" : "List"}</button>
        </footer>
        </div>
    )  
}
}

    export default Toolbar