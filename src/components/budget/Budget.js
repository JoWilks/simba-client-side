import React from 'react'
import { moment } from '../../datefunctions'
import BudgetSettings from './BudgetSettings'

const timeFrames = ['monthly', 'weekly', 'daily']


class Budget extends React.Component {
    
    constructor(props) {
        super(props)
            this.state = {
                viewSettings: false,
                timeFrame: 'weekly' //will need to pull this from redux
            }
        }

    toggleViewSettings = () => {
        this.setState({ viewSettings: !this.state.viewSettings })
    } 


    render () {
        return (
            <div>
                    <h1>Budget View</h1>
                    <button onClick={this.toggleViewSettings}>{this.state.viewSettings ? "Close Settings": "Open Budget Settings"}</button>
                    {
                        this.state.viewSettings &&
                        <BudgetSettings categories={this.props.categories.debit}/>
                    }

                    Here's how you budget is tracking for the 
            </div>
        )
    }
    
    
}


export default Budget