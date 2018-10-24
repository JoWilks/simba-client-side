import React from 'react'
import Listview from '../templates/Listview'
import Graphview from '../templates/Graphview'
import BottomBar from '../BottomBar'
import AddForm from '../templates/AddForm'
import FilterForm from '../templates/FilterForm'
import CircularProgress from '@material-ui/core/CircularProgress'
import '../templates/Forms.css'

import { moment } from '../../datefunctions'

class Credits extends React.Component {
  constructor (props) {
    super(props)
    const transactions = this.props.transactions.credits
    const startDate = moment().subtract(2, 'months').date(1).hour(0).minute(0).second(0)
    const endDate = moment().hour(23).minute(59).second(59)
    this.state = {
      listView: true,
      addFormView: false,
      filterFormView: false,
      credits: transactions,
      filterInfo: { filterType: 'since two months ago', startDate, endDate, category: 'everything' },
      isLoading: true
    }
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
          // Filter for transction in a time range and of a specific category (removed reverse)
          let credits = JSON.parse(JSON.stringify(this.props.transactions.credits))
          let filtered
          if (category === 'everything') {
            filtered = credits.filter(credit => moment(credit.created).isBetween(startDate, endDate))
          } else {
            filtered = credits.filter(credit => credit.category === category && moment(credit.created).isBetween(startDate, endDate))
          }
          this.setState({ credits: filtered })
        }

        render () {
          const { classes } = this.props
          const { listView, addFormView, filterFormView } = this.state
          let view

          if (filterFormView) {
            view = <FilterForm categories={this.props.categories.debit}
              toggleFilterForm={this.toggleFilterForm}
              setFilterType={this.setFilterType}
              filterTransactions={this.filterTransactions} />
          } else if (listView) {
            view = <Listview transactions={this.state.credits} />
          } else {
            view = <Graphview transactions={this.state.credits}
              allTransactions={this.props.transactions.credits}
              filterInfo={this.state.filterInfo} />
          }

          return (
            <div>
              {
                this.state.isLoading &&
                <CircularProgress color='secondary' size={100} />
              }
              {view}

              <div>
                <BottomBar
                  toggleListView={this.toggleListView}
                  listView={this.state.listView}
                  toggleAddForm={this.toggleAddForm}
                  addFormView={this.state.addFormView}
                  toggleFilterForm={this.toggleFilterForm}
                  filterFormView={this.state.filterFormView}
                />
              </div>

            </div>
          )
        }
}

export default Credits
