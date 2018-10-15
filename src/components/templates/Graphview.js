import React from 'react'
import DonutGraph from '../graphs/DonutGraph'
import BarGraph from '../graphs/BarGraph'
import { moment } from '../../datefunctions'

class Graphview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            barGraphView: true,
            isExpense: true,
            donutGraphData: [],
            barGraphData: []
        }
    }

    componentDidMount () {
        this.checkIsExpense()
        this.parseDonutData()
        // this.parseBarData()
    }

    parseDonutData = () => {
            //parse transaction data from props then put in state
            const pieGraphData = []
            this.props.transactions.forEach(transaction => {
                if (pieGraphData[transaction.category]) {
                    pieGraphData[transaction.category]['value'] +=  transaction.amount < 0 
                                                            ? transaction.amount/-1
                                                            : transaction.amount
                } else {
                    let obj = {}
                    obj['id'] = transaction.category
                    obj['label'] = transaction.category
                    obj['value'] = transaction.amount < 0
                                    ? (transaction.amount/-1)
                                    : transaction.amount
                    pieGraphData[transaction.category] = obj
                }
            })
    
            let newArray = []
            Object.keys(pieGraphData).forEach(function (key) {
                pieGraphData[key].value /= 100 //converts from pence/cents to £/$
                newArray.push(pieGraphData[key])
             });
    
            this.setState({ donutGraphData: newArray })
    }

    parseBarData = () => {
        const barGraphData = []
        const allTransactions = JSON.parse(JSON.stringify(this.props.allTransactions)).reverse()
        const { filterInfo } = this.props

        switch (filterInfo.filterType) {
            case 'today':
                // make array of days starting from today going back 7 days
                const startToday = moment().hour(0).minute(0).second(0)
                let currDate = startToday.subtract(7, 'days')
                for (let i=1; i<8; i++) {
                    barGraphData[currDate]= {date: currDate.format("dddd Do MMMM")}
                    currDate = currDate.add(1, 'days')
                }

                //add categories with values of summed amounts to each date range
                Object.keys(barGraphData).forEach(date => {
                    const startKeyDate = moment(date).hour(0).minute(0).second(0)
                    const endKeyDate = moment(date).hour(23).minute(59).second(59)
                    allTransactions.forEach(transaction => {
                        const transDate = moment(transaction.settled)
                            if (transDate.isBetween(startKeyDate, endKeyDate) ) {

                                if (barGraphData[date][transaction.category]) {
                                    barGraphData[date][transaction.category] +=  transaction.amount < 0 
                                                                            ? transaction.amount/-1
                                                                            : transaction.amount
                                } else {
                                    barGraphData[date][transaction.category] = transaction.amount < 0
                                                                            ? (transaction.amount/-1)
                                                                            : transaction.amount
                                }

                            }
                        })
                    })
                    
                    //remove date key from before objects
                    let newArray = []
                    Object.keys(barGraphData).forEach( key => {
                        console.log(key, barGraphData[key])
                        Object.keys(barGraphData[key]).forEach( keyname => {
                            console.log(barGraphData[key][keyname])
                           if (Number.isInteger(barGraphData[key][keyname])) {
                                barGraphData[key][keyname] /= 100 //converts from pence/cents to £/$  
                           } 
                        })
                        newArray.push(barGraphData[key])
                    });

                    this.setState({ barGraphData: newArray })
                break;
            case 'this week':

                break;
            case 'this month':

                break;
            default:
                break;
        }


    }

    // [
    //     {
    //       "country": "AD",
    //       "hot dog": 20,
    //       "hot dogColor": "hsl(104, 70%, 50%)",
    //       "burger": 54,
    //       "burgerColor": "hsl(351, 70%, 50%)",
    //       "sandwich": 79,
    //       "sandwichColor": "hsl(193, 70%, 50%)",
    //       "kebab": 174,
    //       "kebabColor": "hsl(195, 70%, 50%)",
    //       "fries": 148,
    //       "friesColor": "hsl(100, 70%, 50%)",
    //       "donut": 154,
    //       "donutColor": "hsl(117, 70%, 50%)"
    //     }
    // ]

    checkIsExpense = () => {
        //check whether expense or income
        const isExpense = this.props.transactions[0].amount < 0 ? true : false
        this.setState({ isExpense: isExpense })
    }

    toggleBarOrLineGraph = () => {
        this.setState({ barGraphView: !this.state.barGraphView })
    }

    render () {
        return (
            <div>
                <h1>Expenses</h1>
                <button onClick={this.toggleBarOrLineGraph}>{this.state.barGraphView ? "Line Graph" : "Bar Graph"}</button>
                <button onClick={this.parseBarData}>Test</button>
                <DonutGraph donutGraphData={this.state.donutGraphData}/>
                {
                    this.state.barGraphView
                    ? <BarGraph   barGraphData={this.state.barGraphData}/>
                    : null
                }
            </div>
        )
    }


}


export default Graphview