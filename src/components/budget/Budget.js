import React from 'react'
import BudgetSettings from './BudgetSettings'
import { HalfCircleMeter } from 'react-svg-meters'
import { moment } from '../../datefunctions'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import BottomBar from '../BottomBar'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { compose } from '../../../../../Library/Caches/typescript/3.1/node_modules/redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 0.5,
    textAlign: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary
  }
})

class Budget extends React.Component {
  constructor (props) {
    super(props)
    const timeFrame = props.budget.timeFrame
    this.state = {
      viewSettings: false,
      targetsSpent: [],
      totalSpent: 0,
      totalBudget: 0,
      timeFrame: timeFrame, // will need to pull this from redux
      isLoading: true
    }
    this.calculateBudget = this.calculateBudget.bind(this)
    this.setTimeFrame = this.setTimeFrame.bind(this)
  }

  componentDidMount () {
    this.calculateBudget()
    this.setState({ isLoading: false })
  }

    toggleViewSettings = () => {
      this.setState({ viewSettings: !this.state.viewSettings })
    }

    setTimeFrame = (value) => {
      this.setState({ timeFrame: value })
    }

    calculateBudget = () => {
      // create hash of category name and cuurent total spend values for specified timeframes && set budget target
      let allDebitsInTimeframe = this.filterByTimeFrame()
      this.filterByCategories(allDebitsInTimeframe)
    }

    filterByTimeFrame = () => {
      const allDebits = JSON.parse(JSON.stringify(this.props.transactions.debits))

      // filter allDebits between specified time range
      let endBudgetPeriod = moment().hour(23).minute(59).second(59)
      let startBudgetPeriod = moment()
      switch (this.state.timeFrame) {
        case 'daily':
          startBudgetPeriod = startBudgetPeriod.hour(0).minute(0).second(0)
          break
        case 'weekly':
          // need to pull start day of week from redux
          startBudgetPeriod = startBudgetPeriod.day('Monday').hour(0).minute(0).second(0)
          break
        case 'monthly':
          // need to pull start day of month from redux
          startBudgetPeriod = startBudgetPeriod.subtract(1, 'months').date(1).hour(0).minute(0).second(0)
          break
        default:
          console.log('default')
      }
      return allDebits.filter(debit => moment(debit.created).isBetween(startBudgetPeriod, endBudgetPeriod))
    }

    filterByCategories = (allDebitsInTimeframe) => {
      let totalSpent = 0
      const sortedCatOfDebits = {}

      allDebitsInTimeframe.forEach(transaction => {
        totalSpent += transaction.amount
        if (sortedCatOfDebits[transaction.category]) {
          sortedCatOfDebits[transaction.category] += transaction.amount
        } else {
          sortedCatOfDebits[transaction.category] = transaction.amount
        }
      })

      const { categories } = this.props.budget
      let totalBudget = 0
      let finalArray = []
      Object.keys(categories).forEach(key => {
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

    calcPercent = (spent, limit) => {
      if (spent === 0) {
        return 0
      } else if (spent > limit) {
        return 100
      } else {
        return Math.round((spent / limit) * 100)
      }
    }

    render () {
      const { totalSpent, totalBudget, timeFrame, viewSettings } = this.state
      const { classes } = this.props
      const { calcPercent } = this

      return (
        <div>
          {
            this.state.isLoading &&
            <CircularProgress color='secondary' size={100} />
          }
          {
            viewSettings
              ? <BudgetSettings budget={this.props.budget}
                putCategoriesBudget={this.props.putCategoriesBudget}
                setCategoriesBudget={this.props.setCategoriesBudget}
                toggleViewSettings={this.toggleViewSettings}
                calculateBudget={this.calculateBudget}
                setTimeFrame={this.setTimeFrame} />
              : <Grid className={classes.root}>

                <Paper className={classes.paper}>
                  <Grid container spacing={0} >
                    <Grid item xs={12}>
                      <p>Here's how your total {timeFrame} budget is tracking:</p>
                    </Grid>
                    <Grid item xs={12}>
                      <HalfCircleMeter backgroundColor='#ff7fb1' foregroundColor='#ff004a' value={calcPercent(totalSpent / -100, totalBudget)} />
                    </Grid>
                    <Grid item xs={12}>
                      <p>Total Spent: £{totalSpent / -100} { totalBudget > 0 ? ` out of your £${totalBudget} budget` : ` but you haven't set a budget!`}</p>
                    </Grid>
                  </Grid>
                </Paper> <br />

                <Paper className={classes.paper}>
                  <Grid container spacing={0} >
                    <Grid item xs={12}>
                      <p>How much you've spent on each category...</p> <br />
                    </Grid>
                    {
                      this.state.targetsSpent.map(element =>
                        <div key={Object.keys(element)[0]}>
                          <Paper className={classes.paper}>
                            <Grid container spacing={0} >
                              <Grid item xs={12}>
                                <h5>{Object.keys(element)[0]}</h5>
                                <p>You've spent £{element[Object.keys(element)].spent / -1} out of your £${element[Object.keys(element)[0]].limit} budget</p>
                                <LinearProgress color='secondary' variant='determinate' value={calcPercent((element[Object.keys(element)].spent / -1), element[Object.keys(element)[0]].limit)} />
                              </Grid>
                            </Grid>
                          </Paper>
                          <br />
                        </div>
                      )
                    }
                  </Grid>
                </Paper>
              </Grid>
          }
          <BottomBar toggleViewSettings={this.toggleViewSettings}
            viewSettings={this.state.viewSettings} />
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

Budget.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, { name: 'Budget' }),
  connect(mapStateToProps, actions))(Budget)
