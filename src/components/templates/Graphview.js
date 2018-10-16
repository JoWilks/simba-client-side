import React from 'react'
import DonutGraph from '../graphs/DonutGraph'
import BarGraph from '../graphs/BarGraph'
import LineGraph from '../graphs/LineGraph'
import { connect } from 'react-redux'
import { moment } from '../../datefunctions'

class Graphview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            barGraphView: false,
            isExpense: true,
            donutGraphData: [],
            barGraphData: [],
            lineGraphData: []
        }
    }

    componentDidMount () {
        this.checkIsExpense()

        if (this.props.filterInfo.category === 'everything') {
            this.parseBarData()
            this.parseDonutData()
         } else {
            this.parseLineData()
         }
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
        const { filterInfo } = this.props

        let barGraphData = []
        let newArray = []
        let endDate = moment(filterInfo.endDate).hour(0).minute(0).second(0)
        let currDate

        switch (filterInfo.filterType) {
            case 'today':
                // make array of days starting from today going back 7 days

                currDate = endDate.subtract(6, 'days')
                    for (let i=1; i<8; i++) {
                        barGraphData[currDate]= {date: currDate.format("dddd Do MMMM")}
                        currDate = currDate.add(1, 'days')
                    }

                //add categories with values of summed amounts to each date range
                barGraphData = this.sortIntoCategoriesandDateRange(barGraphData)
                    
                //remove date key from before objects
                Object.keys(barGraphData).forEach( key => {
                    Object.keys(barGraphData[key]).forEach( keyname => {
                        if (Number.isInteger(barGraphData[key][keyname])) {
                            barGraphData[key][keyname] /= 100 //converts from pence/cents to £/$  
                        } 
                    })
                    newArray.push(barGraphData[key])
                });

                    this.setState({ barGraphData: newArray })
                break;
            case 'this week':
                // make array of days starting from today going back 7 weeks
                currDate = endDate.subtract(6, 'weeks')
                    for (let i=1; i<8; i++) {
                    barGraphData[currDate]= {date: currDate.format("dddd Do MMMM")}
                    currDate = currDate.add(1, 'weeks')
                    } 
                    
                //add categories with values of summed amounts to each date range
                barGraphData = this.sortIntoCategoriesandDateRange(barGraphData, 'weekly')
                    
                //remove date key from before objects
                Object.keys(barGraphData).forEach( key => {
                    Object.keys(barGraphData[key]).forEach( keyname => {
                        if (Number.isInteger(barGraphData[key][keyname])) {
                            barGraphData[key][keyname] /= 100 //converts from pence/cents to £/$  
                        } 
                    })
                    newArray.push(barGraphData[key])
                });

                    this.setState({ barGraphData: newArray })
                break; 
            case 'this month':
                // make array of days starting from today going back 7 weeks
                currDate = endDate.subtract(2, 'months').date(1).hour(0).minute(0).second(0)
                for (let i=1; i<4; i++) {
                barGraphData[currDate]= {date: currDate.format("dddd Do MMMM")}
                currDate = currDate.add(1, 'months')
                } 
                
                //add categories with values of summed amounts to each date range
                barGraphData = this.sortIntoCategoriesandDateRange(barGraphData, 'weekly')
                    
                //remove date key from before objects
                Object.keys(barGraphData).forEach( key => {
                    Object.keys(barGraphData[key]).forEach( keyname => {
                        if (Number.isInteger(barGraphData[key][keyname])) {
                            barGraphData[key][keyname] /= 100 //converts from pence/cents to £/$  
                        } 
                    })
                    newArray.push(barGraphData[key])
                });

                this.setState({ barGraphData: newArray })
                break;
            default:
                break;
        }
    }

    sortIntoCategoriesandDateRange = (array, rangeType) => {
         //add categories with values of summed amounts to each date range
         const allTransactions = JSON.parse(JSON.stringify(this.props.allTransactions)).reverse()

         Object.keys(array).forEach(date => {
            const startKeyDate = moment(date).hour(0).minute(0).second(0)
            let endKeyDate
                if (rangeType === 'weekly') {
                    endKeyDate = moment(date).hour(0).minute(0).second(0).add(1, 'weeks')
                } else if (rangeType === 'monthly') {
                    endKeyDate = moment(date).hour(23).minute(59).second(59).add(1, 'months')
                } else {
                    endKeyDate = moment(date).hour(23).minute(59).second(59)
                }
            allTransactions.forEach(transaction => {
                const transDate = moment(transaction.settled)
                    if (transDate.isBetween(startKeyDate, endKeyDate) ) {

                        if (array[date][transaction.category]) {
                            array[date][transaction.category] +=  transaction.amount < 0 
                                                                    ? transaction.amount/-1
                                                                    : transaction.amount
                        } else {
                            array[date][transaction.category] = transaction.amount < 0
                                                                    ? (transaction.amount/-1)
                                                                    : transaction.amount
                        }
                    }
            })
        })
        return array
    }
    

    parseLineData = () => {

        const { filterInfo } = this.props

        //for 1 category
        let arrayOfDates = []
        let endDate = moment(filterInfo.endDate).hour(0).minute(0).second(0)
        let currDate
        // let arrayData = []
        let finalArray = []

        switch (filterInfo.filterType) {
            case 'today':
                currDate = endDate.subtract(6, 'days')
                for (let i=1; i<8; i++) {
                    arrayOfDates.push(currDate.format("dddd Do MMMM"))
                    currDate = currDate.add(1, 'days')
                }
                // arrayOfDates.forEach(date => {
                //     let obj = {} 
                //     obj['x'] = date
                //     obj['y'] = 0

                //     allTransactions.forEach(transaction => {
                //         if ( moment(transaction.created).format("dddd Do MMMM") == date ) {
                //             obj.y += transaction.amount
                //         }
                //     })
                //     arrayData.push(obj)
                // })

                let arrayData = this.sortIntoTotalsforDates(arrayOfDates)
                finalArray = [ { id: filterInfo.category, data: arrayData } ]
                debugger

                break;
            case 'this week':
                currDate = endDate.subtract(6, 'weeks')
                for (let i=1; i<8; i++) {
                    arrayOfDates.push(currDate.format("dddd Do MMMM"))
                    currDate = currDate.add(1, 'weeks')
                }
                // arrayOfDates.forEach(date => {
                //     let obj = {} 
                //     obj['x'] = date
                //     obj['y'] = 0

                //     allTransactions.forEach(transaction => {
                //         if ( moment(transaction.created).format("dddd Do MMMM") == date ) {
                //             obj.y += transaction.amount
                //         }
                //     })
                //     arrayData.push(obj)
                // })

                // let finalArray = [{id: filterInfo.category, data: arrayData }]
                break;
            case 'this month':
                currDate = endDate.subtract(6, 'months')
                for (let i=1; i<8; i++) {
                    arrayOfDates.push(currDate.format("dddd Do MMMM"))
                    currDate = currDate.add(1, 'months')
                }
                // arrayOfDates.forEach(date => {
                //     let obj = {} 
                //     obj['x'] = date
                //     obj['y'] = 0

                //     allTransactions.forEach(transaction => {
                //         if ( moment(transaction.created).format("dddd Do MMMM") == date ) {
                //             obj.y += transaction.amount
                //         }
                //     })
                //     arrayData.push(obj)
                // })

                // let finalArray = [{id: filterInfo.category, data: arrayData }]
            break;
        }
        
         this.setState({ lineGraphData: finalArray })

        // [{id: 'category', data: [
        //                             {x: 1, y 1},
        //                             {x: 1, y 1}   
        // ]}]
    }

    sortIntoTotalsforDates = (arrayOfDates) => {
        const allTransactions = JSON.parse(JSON.stringify(this.props.allTransactions)).reverse()
        let arrayData = []

        arrayOfDates.forEach(date => {
            let obj = {} 
            obj['x'] = date
            obj['y'] = 0
    
            allTransactions.forEach(transaction => {
                if ( moment(transaction.created).format("dddd Do MMMM") == date ) {
                    obj.y += transaction.amount
                }
            })
            arrayData.push(obj)
        })

        arrayData.forEach(obj => {
            obj.y /= -100
        })
        return arrayData
    }




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
                <button onClick={this.parseLineData}>Test</button>
                <DonutGraph donutGraphData={this.state.donutGraphData}/>
                {
                    this.state.barGraphView
                    //for categories prop to bargraph- will change to if statement depending if expense or not once figure out income categories
                    ? <BarGraph   barGraphData={this.state.barGraphData} categories={this.props.categories.debit}/>
                    : <LineGraph  lineGraphData={this.state.lineGraphData} />
                }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})

export default connect(mapStateToProps, null)(Graphview)