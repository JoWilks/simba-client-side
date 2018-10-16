import React from 'react'
import NetListview from './NetListview'
import NetGraphview from './NetGraphview'
import Toolbar from '../Toolbar'
import FilterForm from '../templates/FilterForm'
import '../templates/Forms.css'

import { moment } from '../../datefunctions'

class Net extends React.Component {
    constructor(props) {
        super(props)
        const startDate = moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0)
        const endDate = moment().hour(23).minute(59).second(59)
        this.state = {
            net: [], 
            lineGraphData: [],
            listView: true,
            filterInfo: {filterType: 'since two months ago', startDate , endDate, category: 'everything' }
   
        }
    }

    componentDidMount () {
        //get sum of all daily transactions (i.e. debit + credit), and store on per day basis
        //*** CURRRENTLY STORES IN FORMAT LIKED BY LINE DATA GRAPH *****
        const allTransactions = JSON.parse(JSON.stringify(this.props.transactions.twoMonths)).reverse()

        let arrayDates = []
        let arrayObjsDateSum = [] 
        let cyclingDate = this.state.filterInfo.startDate
        let endDate = this.state.filterInfo.endDate
        //make array of objects for each day
        while (cyclingDate.isSameOrBefore(endDate)) {
            arrayDates.push( {date: cyclingDate.format("dddd Do MMMM")} )
            cyclingDate = cyclingDate.add(1, 'days')
        }
        //sum transactions for each day based on arrayDates
        arrayDates.forEach(obj => {
            let newObj = {} 
            newObj['x'] = obj.date
            newObj['y'] = 0
                allTransactions.forEach(transaction => {
                    if ( moment(transaction.created).format("dddd Do MMMM") === obj.date ) {
                        newObj.y += transaction.amount
                    }
                })
                arrayObjsDateSum.push(newObj)
        })
        //convert to £/$
        arrayObjsDateSum.forEach(obj => obj.y /= 100)

        let lineGraphData = [{id: 'net', data: arrayObjsDateSum}]
        this.setState({ net : arrayObjsDateSum, lineGraphData })
        
    }

    toggleListView = () => {
        this.setState({ listView: !this.state.listView })
    }


    toggleFilterForm = () => {
        this.setState({ 
            filterFormView: !this.state.filterFormView,
            addFormView: false
        })
    }

    setFilterType = (string, start, end) => {
        if (string === 'between') {
            const diff = end.diff(start, 'days')
            let filterType
                if (diff >= 29) {
                    filterType = 'this month' 
                } else if (diff >= 6) {
                    filterType = 'this week' 
                } else {
                    filterType = 'today'
                }
            this.setState(prev => ({ ...prev, filterInfo: {...prev.filterInfo, filterType, startDate: start, endDate: end} })) 
        } else {
            this.setState(prev => ({ ...prev, filterInfo: {...prev.filterInfo, filterType: string} })) 
        }
    }


    render () {
        return (
            <div>
                NET VIEW
                {
                    this.state.filterFormView &&
                    <FilterForm categories={this.props.categories.debit}
                                toggleFilterForm={this.toggleFilterForm}
                                setFilterType={this.setFilterType}/>
                }

                {
                    //if statement to show either listview or graph
                     this.state.listView ? 
                    <NetListview    net={this.state.net} /> :
                    <NetGraphview   lineGraphData={this.state.lineGraphData}
                                    filterInfo={this.state.filterInfo} />
                }

                <div>
                    <Toolbar 
                    toggleListView={this.toggleListView} 
                    listView={this.state.listView}
                    toggleFilterForm={this.toggleFilterForm} 
                    filterFormView={this.state.filterFormView}
                    />
                </div>
                
            </div>
        )
    }


}


export default Net