import React from 'react'
import DonutGraph from '../graphs/DonutGraph'
import BarGraph from '../graphs/BarGraph'
import LineGraph from '../graphs/LineGraph'
import { connect } from 'react-redux'
import { moment } from '../../datefunctions'
import { timingSafeEqual } from 'crypto'

class Graphview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      barGraphView: false,
      donutGraphData: [],
      barGraphData: [],
      lineGraphData: [],
      total: ''
    }
  }

  componentDidMount () {
    if (this.props.filterInfo.category === 'everything') {
      this.setState({ barGraphView: true })
      this.parseBarData()
      this.parseDonutData()
    } else {
      this.setState({ barGraphView: false })
      this.parseLineData()
    }
  }

  calculateTotal = (array) => {
    let runningTotal = 0
    array.forEach(cat => { runningTotal += cat.value })
    this.setState({ total: runningTotal })
  }

    parseDonutData = () => {
      // parse transaction data from props then put in state
      const pieGraphData = []
      this.props.transactions.forEach(transaction => {
        if (pieGraphData[transaction.category]) {
          pieGraphData[transaction.category]['value'] += transaction.amount < 0
            ? transaction.amount / -1
            : transaction.amount
        } else {
          let obj = {}
          obj['id'] = transaction.category
          obj['label'] = transaction.category
          obj['value'] = transaction.amount < 0
            ? (transaction.amount / -1)
            : transaction.amount
          pieGraphData[transaction.category] = obj
        }
      })

      let newArray = []
      Object.keys(pieGraphData).forEach(function (key) {
        pieGraphData[key].value /= 100 // converts from pence/cents to £/$
        newArray.push(pieGraphData[key])
      })

      this.calculateTotal(newArray)

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
          for (let i = 1; i < 8; i++) {
            barGraphData[currDate] = { date: currDate.format('MM-DD-YYYY HH:mm') }
            currDate = currDate.add(1, 'days')
          }

          // add categories with values of summed amounts to each date range
          barGraphData = this.sortIntoCategoriesandDateRange(barGraphData)

          // remove date key from before objects
          Object.keys(barGraphData).forEach(key => {
            Object.keys(barGraphData[key]).forEach(keyname => {
              if (Number.isInteger(barGraphData[key][keyname])) {
                barGraphData[key][keyname] /= 100 // converts from pence/cents to £/$
              } else {
                barGraphData[key][keyname] = moment(barGraphData[key][keyname]).format('Do MMM YY')
              }
            })
            newArray.push(barGraphData[key])
          })

          this.setState({ barGraphData: newArray })
          break
        case 'this week':
          // make array of days starting from today going back 7 weeks
          currDate = endDate.subtract(6, 'weeks')
          for (let i = 1; i < 8; i++) {
            barGraphData[currDate] = { date: currDate.format('MM-DD-YYYY HH:mm') }
            currDate = currDate.add(1, 'weeks')
          }

          // add categories with values of summed amounts to each date range
          barGraphData = this.sortIntoCategoriesandDateRange(barGraphData, 'weekly')

          // remove date key from before objects
          Object.keys(barGraphData).forEach(key => {
            Object.keys(barGraphData[key]).forEach(keyname => {
              if (Number.isInteger(barGraphData[key][keyname])) {
                barGraphData[key][keyname] /= 100 // converts from pence/cents to £/$
              } else {
                barGraphData[key][keyname] = moment(barGraphData[key][keyname]).format('Do MMM YY')
              }
            })
            newArray.push(barGraphData[key])
          })
          this.setState({ barGraphData: newArray })
          break
        case 'this month':
          // make array of months starting from today going back 2-3 months
          currDate = endDate.subtract(2, 'months').date(1).hour(0).minute(0).second(0)
          for (let i = 1; i < 4; i++) {
            barGraphData[currDate] = { date: currDate.format('MM-DD-YYYY HH:mm') }
            currDate = currDate.add(1, 'months')
          }

          // add categories with values of summed amounts to each date range
          barGraphData = this.sortIntoCategoriesandDateRange(barGraphData, 'monthly')

          // remove date key from before objects
          Object.keys(barGraphData).forEach(key => {
            Object.keys(barGraphData[key]).forEach(keyname => {
              if (Number.isInteger(barGraphData[key][keyname])) {
                barGraphData[key][keyname] /= 100 // converts from pence/cents to £/$
              } else {
                barGraphData[key][keyname] = moment(barGraphData[key][keyname]).format('Do MMM YY')
              }
            })
            newArray.push(barGraphData[key])
          })

          this.setState({ barGraphData: newArray })
          break
        default:
          // make array of months starting from today going back 2-3 months
          currDate = endDate.subtract(2, 'months').date(1).hour(0).minute(0).second(0)
          for (let i = 1; i < 4; i++) {
            barGraphData[currDate] = { date: currDate.format('MM-DD-YYYY HH:mm') }
            currDate = currDate.add(1, 'months')
          }

          // add categories with values of summed amounts to each date range
          barGraphData = this.sortIntoCategoriesandDateRange(barGraphData, 'monthly')

          // remove date key from before objects
          Object.keys(barGraphData).forEach(key => {
            Object.keys(barGraphData[key]).forEach(keyname => {
              if (Number.isInteger(barGraphData[key][keyname])) {
                barGraphData[key][keyname] /= 100 // converts from pence/cents to £/$
              } else {
                barGraphData[key][keyname] = moment(barGraphData[key][keyname]).format('Do MMM YY')
              }
            })
            newArray.push(barGraphData[key])
          })

          this.setState({ barGraphData: newArray })
          break
      }
    }

    sortIntoCategoriesandDateRange = (obj, rangeType) => {
      // add categories with values of summed amounts to each date range
      const allTransactions = JSON.parse(JSON.stringify(this.props.allTransactions)).reverse()
      Object.keys(obj).forEach(date => {
        const startKeyDate = moment(date).hour(0).minute(0).second(0)
        let endKeyDate
        if (rangeType === 'weekly') {
          endKeyDate = moment(date).add(1, 'weeks').hour(0).minute(0).second(0)
        } else if (rangeType === 'monthly') {
          endKeyDate = moment(date).add(1, 'months').hour(23).minute(59).second(59)
        } else {
          endKeyDate = moment(date).hour(23).minute(59).second(59)
        }
        allTransactions.forEach(transaction => {
          const transDate = moment(transaction.created)
          if (transDate.isBetween(startKeyDate, endKeyDate)) {
            if (obj[date][transaction.category]) {
              obj[date][transaction.category] += transaction.amount < 0
                ? transaction.amount / -1
                : transaction.amount
            } else {
              obj[date][transaction.category] = transaction.amount < 0
                ? (transaction.amount / -1)
                : transaction.amount
            }
          }
        })
      })
      return obj
    }

    parseLineData = () => {
      // only doing this for 1 category
      const { filterInfo } = this.props
      let arrayOfDates = []
      let endDate = moment(filterInfo.endDate).hour(0).minute(0).second(0)
      let currDate
      // let arrayData = []
      let finalArray = []

      switch (filterInfo.filterType) {
        case 'today':
          currDate = endDate.subtract(6, 'days')
          for (let i = 1; i < 8; i++) {
            arrayOfDates.push(currDate.format('MM-DD-YYYY HH:mm'))
            currDate = currDate.add(1, 'days')
          }
          finalArray = this.sortIntoTotalsforDates(arrayOfDates, filterInfo.category)
          break

        case 'this week':
          currDate = endDate.subtract(6, 'weeks')
          for (let i = 1; i < 8; i++) {
            arrayOfDates.push(currDate.format('MM-DD-YYYY HH:mm'))
            currDate = currDate.add(1, 'weeks')
          }
          finalArray = this.sortIntoTotalsforDates(arrayOfDates, filterInfo.category)
          break

        case 'this month':
          currDate = endDate.subtract(3, 'months')
          for (let i = 1; i < 4; i++) {
            arrayOfDates.push(currDate.format('MM-DD-YYYY HH:mm'))
            currDate = currDate.add(1, 'months')
          }
          finalArray = this.sortIntoTotalsforDates(arrayOfDates, filterInfo.category)
          break
        default:
          currDate = endDate.subtract(3, 'months')
          for (let i = 1; i < 4; i++) {
            arrayOfDates.push(currDate.format('MM-DD-YYYY HH:mm '))
            currDate = currDate.add(1, 'months')
          }
          finalArray = this.sortIntoTotalsforDates(arrayOfDates, filterInfo.category)
          break
      }

      this.setState({ lineGraphData: finalArray })
    }

    sortIntoTotalsforDates = (arrayOfDates, category) => {
      const allTransactions = JSON.parse(JSON.stringify(this.props.allTransactions)).reverse()
      let arrayData = []
      arrayOfDates.forEach((date, index) => {
        let obj = {}
        obj['x'] = moment(date).format('Do MMM YY')
        obj['y'] = 0
        allTransactions.forEach(transaction => {
          const startDate = moment(date).hour(0).minute(0).second(0)
          const endDate = moment(arrayOfDates[index + 1]).hour(0).minute(0).second(0)
          const transactionDate = moment(transaction.created)

          if (transactionDate.isBetween(startDate, endDate) && transaction.category === category) {
            obj.y += transaction.amount
          }
        })
        arrayData.push(obj)
      })
      arrayData.forEach(obj => {
        obj.y < 0 ? obj.y /= -100 : obj.y /= 100
      })
      
      return [ { id: category, data: arrayData } ]
    }

    render () {
      let titleDescription

      switch (this.props.currentView) {
        case 'Expenses':
          titleDescription = 'spent'
          break
        case 'Income':
          titleDescription = 'earnt'
          break
        case 'Net':
          titleDescription = 'earnt'
          break
        default:
          titleDescription = ''
          break
      }

      return (
        <div>
          <h1>
            {
              this.state.barGraphView &&
              `£${this.state.total} ${titleDescription} `
            }
            {this.props.filterInfo.filterType}
          </h1>
          {
            this.props.filterInfo.category === 'everything' &&
            <DonutGraph donutGraphData={this.state.donutGraphData} />
          }
          {
            this.state.barGraphView
            // for categories prop to bargraph- will change to if statement depending if expense or not once figure out income categories
              ? <BarGraph barGraphData={this.state.barGraphData} categories={this.props.categories.debit} />
              : <LineGraph lineGraphData={this.state.lineGraphData} />
          }
        </div>
      )
    }
}

const mapStateToProps = state => ({
  categories: state.categoriesReducer,
  views: state.viewsReducer
})

export default connect(mapStateToProps, null)(Graphview)
