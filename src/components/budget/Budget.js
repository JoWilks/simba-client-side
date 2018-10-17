import React from 'react'
import BudgetSettings from './BudgetSettings'
import { LineMeter, HalfCircleMeter } from 'react-svg-meters'
import { moment } from '../../datefunctions'
import './Budget.css' 

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

    calculateBudget = (timeFrame) => {
       const allDebits = JSON.parse(JSON.stringify(this.props.transactions.debits))

    }

    render () {
        return (
            <div>
                    <h1>Budget View</h1>
                    {/* should put button on toolbar */}
                    <button onClick={this.toggleViewSettings}>{this.state.viewSettings ? "Close Settings": "Open Budget Settings"}</button>
                    {
                        this.state.viewSettings 
                        ? <BudgetSettings categories={this.props.categories.debit}/>
                        : (<div className=''>
                            <p>Here's how your total {this.state.timeFrame} budget is tracking:</p> <br></br>
                                <HalfCircleMeter value={75}/> <br></br>
                                <p>How much you've spent on each category...</p> <br></br>
                                <div className='container'>
                                {this.props.categories.debit.map(category => 
                                        <div className={`budget ${category}`}>
                                            {category} <LineMeter   size={75}
                                                                    value={75}/>
                                        </div>
                                )}
                                </div>
                            </div>
                        )
                    }

            </div>
        )
    }
    
    
}


export default Budget