import React from 'react'
import NetListview from './NetListview'
import NetGraphview from './NetGraphview'
import BottomBar from '../BottomBar'
import FilterForm from '../templates/FilterForm'
import '../templates/Forms.css'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

import { moment } from '../../datefunctions'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

class Net extends React.Component {
  constructor (props) {
    super(props)
    const startDate = moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0)
    const endDate = moment().hour(23).minute(59).second(59)
    this.state = {
      netAll: [],
      net: [],
      lineGraphData: [],
      listView: true,
      filterInfo: { filterType: 'since two months ago', startDate, endDate, category: 'everything' },
      isLoading: true,
      runningTotal: 0
    }
  }

  componentDidMount () {
    // get sum of all daily transactions (i.e. debit + credit), and store on per day basis
    //* ** CURRRENTLY STORES IN FORMAT LIKED BY LINE DATA GRAPH *****
    if (this.state.netAll.length === 0) {
      const allTransactions = JSON.parse(JSON.stringify(this.props.transactions.twoMonths))

      let arrayDates = []
      let arrayObjsDateSum = []
      let cyclingDate = this.state.filterInfo.startDate
      let endDate = this.state.filterInfo.endDate
      // make array of objects for each day
      while (cyclingDate.isSameOrBefore(endDate)) {
        arrayDates.push({ date: cyclingDate.format('MM-DD-YYYY HH:mm') })
        cyclingDate = cyclingDate.add(1, 'days')
      }
      // sum transactions for each day based on arrayDates
      arrayDates.forEach(obj => {
        let newObj = {}
        newObj['realDate'] = moment(obj.date).format('MM-DD-YYYY HH:mm:ss')
        newObj['x'] = moment(obj.date).format('MM/DD') // used for display purposes
        newObj['y'] = 0
        allTransactions.forEach(transaction => {
          const startDate = moment(obj.date).hour(0).minute(0).second(0)
          const endDate = moment(obj.date).hour(23).minute(59).second(59)
          if (moment(transaction.created).isBetween(startDate, endDate)) {
            newObj.y += transaction.amount
          }
        })
        arrayObjsDateSum.push(newObj)
      })

      // change to monthly data points
      let graphData = arrayObjsDateSum.length > 31 && this.state.filterInfo.filterType !== 'this month'
        ? this.filterTransactionsMonthly(arrayObjsDateSum)
        : arrayObjsDateSum

      // get running total
      let runningTotal = 0
      arrayObjsDateSum.forEach(obj => {
        runningTotal += obj.y
      })
      let lineGraphData = [{ id: 'net', data: graphData }]
      this.setState({ netAll: arrayObjsDateSum, net: arrayObjsDateSum, lineGraphData, isLoading: false, runningTotal: runningTotal })
    } else {
      this.setState({ isLoading: false })
    }
  }

  filterTransactionsMonthly = (array) => {
    let runningTotal = 0
    let netAll = array ? [...array] : [...this.state.netAll]
    let arrayOfDates = []
    let newNet = []
    let endDate = moment(this.state.filterInfo.endDate).hour(0).minute(0).second(0)

    let currDate = endDate.subtract(3, 'months')
    for (let i = 1; i < 4; i++) {
      arrayOfDates.push(currDate.format('MM-DD-YYYY HH:mm'))
      currDate = currDate.add(1, 'months')
    }

    arrayOfDates.forEach((date, index) => {
      let obj = {}
      obj['realDate'] = moment(date).format('MM-DD-YYYY HH:mm:ss')
      obj['x'] = moment(date).format('Do MMM YY')
      obj['y'] = 0
      netAll.forEach(net => {
        const startDate = moment(date).hour(0).minute(0).second(0)
        const endDate = moment(arrayOfDates[index + 1]).hour(0).minute(0).second(0)
        const netDate = moment(net.realDate)

        if (netDate.isBetween(startDate, endDate)) {
          obj.y += net.y
        }
      })
      newNet.push(obj)
    })
    return newNet
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
        this.setState(prev => ({ ...prev, filterInfo: { ...prev.filterInfo, filterType, startDate: start, endDate: end } }))
      } else {
        this.setState(prev => ({ ...prev, filterInfo: { ...prev.filterInfo, filterType: string } }))
      }
    }

    filterTransactions = (category, startDate, endDate) => {
      // Filter for net values in a time range & get running total
      let runningTotal = 0
      let netAll = [...this.state.netAll]
      let newNet = []
      let lengthOfTime = (endDate - startDate) / (1000 * 60 * 60 * 24)
      let lineGraphData

      if (this.state.filterInfo.filterType === 'since two months ago' || lengthOfTime > 31) {
        let data = this.filterTransactionsMonthly()
        lineGraphData = [{ id: 'net', data }]
        data.forEach(obj => {
          runningTotal += obj.y
        })
      } else {
        netAll.forEach(item => {
          let date = moment(item.realDate, 'MM-DD-YYYY HH:mm').hour(1)
          if (date.isBetween(startDate, endDate, null, [])) {
            newNet.push(item)
            runningTotal += item.y
          }
        })
        lineGraphData = [{ id: 'net', data: newNet }]
      }

      this.setState({ net: newNet, lineGraphData, runningTotal })
    }

    render () {
      const { classes } = this.props
      const { listView, filterFormView } = this.state

      let view

      if (filterFormView) {
        view = <FilterForm toggleFilterForm={this.toggleFilterForm}
          setFilterType={this.setFilterType}
          filterTransactions={this.filterTransactions} />
      } else if (listView) {
        view = <NetListview net={this.state.net} />
      } else {
        view = <NetGraphview lineGraphData={this.state.lineGraphData}
          convertToPounds={this.convertToPounds}
          filterInfo={this.state.filterInfo} />
      }

      return (
        <div className={classes.root} >
          {
            this.state.isLoading &&
            <CircularProgress color='secondary' size={100} />
          }
          <h3>Net Total: £{this.state.runningTotal / 100}</h3>
          {view}

          <div>
            <BottomBar
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

Net.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Net)
