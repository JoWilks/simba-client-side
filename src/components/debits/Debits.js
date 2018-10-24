import React from 'react'
import Listview from '../templates/Listview'
import Graphview from '../templates/Graphview'
import BottomBar from '../BottomBar'
import AddForm from '../templates/AddForm'
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

class Debits extends React.Component {
  constructor (props) {
    super(props)
    const transactions = JSON.parse(JSON.stringify(this.props.transactions.debits))
    const startDate = moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0)
    const endDate = moment().hour(23).minute(59).second(59)
    this.state = {
      listView: true,
      addFormView: false,
      filterFormView: false,
      debits: transactions.reverse(),
      filterInfo: { filterType: 'since two months ago', startDate, endDate, category: 'everything' },
      isLoading: true
    }

    this.setFilterType = this.setFilterType.bind(this)
    this.filterTransactions = this.filterTransactions.bind(this)
    this.toggleListView = this.toggleListView.bind(this)
    this.toggleAddForm = this.toggleAddForm.bind(this)
    this.toggleFilterForm = this.toggleFilterForm.bind(this)
  }

  componentDidMount () {
    this.setState({ isLoading: false })
  }

    toggleListView = () => {
      this.setState({ listView: !this.state.listView })
    }

    toggleAddForm = () => {
      this.setState({
        addFormView: !this.state.addFormView,
        filterFormView: false
      })
    }

    toggleFilterForm = () => {
      this.setState({
        filterFormView: !this.state.filterFormView,
        addFormView: false
      })
    }

    setFilterType = (string, start, end, category) => {
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
        this.setState(prev => ({ ...prev, filterInfo: { ...prev.filterInfo, filterType, startDate: start, endDate: end, category: category } }))
      } else {
        this.setState(prev => ({ ...prev, filterInfo: { ...prev.filterInfo, filterType: string, category: category } }))
      }
    }

    filterTransactions = (category, startDate, endDate) => {
      // Filter for transction in a time range and of a specific category .reverse()
      let debits = JSON.parse(JSON.stringify(this.props.transactions.debits))
      debits.reverse()
      let filtered

      if (category === 'everything') {
        filtered = debits.filter(debit => moment(debit.created).isBetween(startDate, endDate))
      } else {
        filtered = debits.filter(debit => debit.category === category && moment(debit.created).isBetween(startDate, endDate))
      }
      this.setState({ debits: filtered })
    }

    render () {
      const { classes } = this.props
      const { listView, addFormView, filterFormView } = this.state
      let view

      // view = <AddForm categories={this.props.categories.debit} ADD LATER
      //   toggleAddForm={this.toggleAddForm} />
      if (filterFormView) {
        view = <FilterForm categories={this.props.categories.debit}
          toggleFilterForm={this.toggleFilterForm}
          setFilterType={this.setFilterType}
          filterTransactions={this.filterTransactions} />
      } else if (listView) {
        view = <Listview transactions={this.state.debits} />
      } else {
        view = <Graphview transactions={this.state.debits}
          allTransactions={this.props.transactions.debits}
          filterInfo={this.state.filterInfo}
          currentView={this.props.views.currentView} />
      }

      return (
        <div className={classes.root} >
          {
            this.state.isLoading &&
            <CircularProgress color='secondary' size={100} />
          }
          {view}

          <div >
            <BottomBar
              toggleListView={this.toggleListView}
              listView={this.state.listView}
              // toggleAddForm={this.toggleAddForm}
              addFormView={this.state.addFormView}
              toggleFilterForm={this.toggleFilterForm}
              filterFormView={this.state.filterFormView}
            />
          </div>

        </div>
      )
    }
}

Debits.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Debits)
