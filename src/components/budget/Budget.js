import React from 'react'
import BudgetSettings from './BudgetSettings'
import { LineMeter, HalfCircleMeter } from 'react-svg-meters'
import { moment } from '../../datefunctions'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import './Budget.css' 

class Budget extends React.Component {
    
    constructor(props) {
        super(props)
        const timeFrame = props.budget.timeFrame
            this.state = {
                viewSettings: false,
                targetsSpent: [],
                totalSpent: 0,
                totalBudget: 0,
                timeFrame: timeFrame //will need to pull this from redux
            }
            this.calculateBudget = this.calculateBudget.bind(this);
            this.setTimeFrame = this.setTimeFrame.bind(this);
        }

    componentDidMount () {
        this.calculateBudget()
    }
        
    toggleViewSettings = () => {
        this.setState({ viewSettings: !this.state.viewSettings })
    } 
    
    setTimeFrame = (value) => {
        this.setState({ timeFrame: value })
    }

    calculateBudget = () => {
        //create hash of category name and cuurent total spend values for specified timeframes && set budget target
        let allDebitsInTimeframe = this.filterByTimeFrame()
        console.log(allDebitsInTimeframe)
        this.filterByCategories(allDebitsInTimeframe)
    }

    filterByTimeFrame = () => {
        const allDebits = JSON.parse(JSON.stringify(this.props.transactions.debits))

        //filter allDebits between specified time range
        let endBudgetPeriod = moment().hour(23).minute(59).second(59)
        let startBudgetPeriod = moment()
        switch (this.state.timeFrame) {
            case 'daily':
                startBudgetPeriod = startBudgetPeriod.hour(0).minute(0).second(0)
            case 'weekly':
                //need to pull start day of week from redux
                startBudgetPeriod = startBudgetPeriod.day('Monday').hour(0).minute(0).second(0)
                break;
            case 'monthly':
                //need to pull start day of month from redux
                startBudgetPeriod = startBudgetPeriod.subtract(1, 'months').date(1).hour(0).minute(0).second(0)
                break;
        }
        return allDebits.filter( debit => moment(debit.created).isBetween( startBudgetPeriod, endBudgetPeriod ) )
    }

    filterByCategories = ( allDebitsInTimeframe) => {
        let totalSpent = 0
        const sortedCatOfDebits = {}

            allDebitsInTimeframe.forEach(transaction => {
                totalSpent += transaction.amount
                if (sortedCatOfDebits[transaction.category]) {
                    sortedCatOfDebits[transaction.category] +=  transaction.amount
                } else {
                    sortedCatOfDebits[transaction.category] = transaction.amount
                }
            })

            const { categories } = this.props.budget
            let totalBudget = 0
            let finalArray = []
                Object.keys(categories).forEach( key => {
                    totalBudget += categories[key]
                    let obj = {}
                    obj[key] = {}
                    obj[key]['limit'] = categories[key]
                    obj[key]['spent'] = sortedCatOfDebits[key] ? sortedCatOfDebits[key] / 100 : 0
                    finalArray.push(obj)
                })
            let budget = this.props.store_current_spending(finalArray)
            this.setState({ targetsSpent: budget.payload, totalSpent, totalBudget })
    }

    render () {
        const { totalSpent, totalBudget, timeFrame } = this.state
        return (
            <div>
                    <h1>Budget View</h1>
                    {/* should put button on toolbar */}
                    <button onClick={this.test}>Test</button>
                    <button onClick={this.toggleViewSettings}>{this.state.viewSettings ? "Close Settings": "Open Budget Settings"}</button>
                    {
                        this.state.viewSettings 
                        ? <BudgetSettings   budget={this.props.budget} 
                                            setCategoriesBudget={this.props.setCategoriesBudget} 
                                            toggleViewSettings={this.toggleViewSettings}
                                            calculateBudget={this.calculateBudget}
                                            setTimeFrame={this.setTimeFrame}/>
                        : <div className=''>
                                <p>Here's how your total {timeFrame} budget is tracking:</p> <br></br>
                                    <HalfCircleMeter value={Math.round(((-10723/-100)/125)*100)}/> <br></br>
                                <p>Total Spent: £{totalSpent/-100} { totalBudget > 0 ? ` out of your £${totalBudget} budget` : ` but you haven't set a budget!`}</p>
                                <p>How much you've spent on each category...</p> <br></br>
                                <div className='container'>
                                    {
                                        this.state.targetsSpent.map(element => 
                                                <div>
                                                    <p><strong>{Object.keys(element)[0]}:</strong> You have spent £{element[Object.keys(element)].spent/-1} 
                                                    {
                                                        element[Object.keys(element)[0]].limit > 0 ? 
                                                        ` out of your £${element[Object.keys(element)[0]].limit} budget` : 
                                                        ` but you haven't set a budget!`
                                                    }
                                                    </p>
                                                </div>
                                        )
                                    }
                                </div>
                        </div>
                    }
                </div>
        )
    }
    
}

const mapStateToProps = state => ({
    currentUser: state.userReducer,
    transactions: state.transactionsReducer,
    accounts: state.accountsReducer,
    categories: state.categoriesReducer,
    budget: state.budgetCategoriesReducer
})

export default connect(mapStateToProps, actions)(Budget)