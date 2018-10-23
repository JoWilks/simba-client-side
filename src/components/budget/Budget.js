import React from 'react'
import BudgetSettings from './BudgetSettings'
import { LineMeter, HalfCircleMeter } from 'react-svg-meters'
import { moment } from '../../datefunctions'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import BottomBar from '../BottomBar'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { compose } from '../../../../../Library/Caches/typescript/3.1/node_modules/redux'

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
      timeFrame: timeFrame // will need to pull this from redux
    }
    this.calculateBudget = this.calculateBudget.bind(this)
    this.setTimeFrame = this.setTimeFrame.bind(this)
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
      // create hash of category name and cuurent total spend values for specified timeframes && set budget target
      let allDebitsInTimeframe = this.filterByTimeFrame()
      console.log(allDebitsInTimeframe)
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

    render () {
      const { totalSpent, totalBudget, timeFrame, viewSettings } = this.state
      const { classes } = this.props

      return (
        <div>
          {
            viewSettings
              ? <BudgetSettings budget={this.props.budget}
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
                      <HalfCircleMeter value={Math.round((totalSpent / totalBudget) * 100)} />
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
                        <div>
                          <Paper className={classes.paper}>
                            <Grid container spacing={0} >
                              <Grid item xs={12}>
                                <p><strong>{Object.keys(element)[0]}:</strong> You have spent £{element[Object.keys(element)].spent / -1}
                                  {
                                    element[Object.keys(element)[0]].limit > 0
                                      ? ` out of your £${element[Object.keys(element)[0]].limit} budget`
                                      : ` but you haven't set a budget!`
                                  }
                                </p>
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
          <BottomBar toggleViewSettings={this.toggleViewSettings} />
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
