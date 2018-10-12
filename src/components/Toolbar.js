import React from 'react'
import { Link } from 'react-router-dom'
import './Toolbar.css'

class Toolbar extends React.Component {
  render () {
    return (
        <div class='toolbar'>
        <footer class='footer'>
            <button>Filter</button>
            <button>Add</button>
            <button onClick={this.props.toggleListView}>{this.props.listView? "Graph" : "List"}</button>
        </footer>
        </div>
    )  
}
}

    export default Toolbar