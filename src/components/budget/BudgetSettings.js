import React from 'react'
import { moment } from '../../datefunctions'
import API from '../../adapters/API'

const timeFrames = ['monthly', 'weekly', 'daily']

class BudgetSettings extends React.Component {
  constructor (props) {
    super(props)
    const budgetCat = props.budget.categories
    const timeFrame = props.budget.timeFrame
    this.state = {
      budgetCat,
      timeFrame,
      runningTotal: 0
    }
  }

    handleChange = (event) => {
      const value = Number(event.target.value) ? Number(event.target.value) : event.target.value
      const name = event.target.name
      this.setState(prev => ({ ...prev, budgetCat: { ...prev.budgetCat, [`${name}`]: value } }))
    }

    handleDropdown = (event) => {
      this.props.setTimeFrame(event.target.value)
      this.setState({ timeFrame: event.target.value })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      let budgetObj = JSON.parse(JSON.stringify(this.state))
      this.props.setCategoriesBudget(budgetObj)
      this.props.calculateBudget()
      this.props.toggleViewSettings()
    }

    calcTotal = () => {
      const { budgetCat } = this.state
      let runningTotal = 0
      Object.keys(budgetCat).forEach(key => {
        runningTotal += (this.state.budgetCat[key])
      })
      this.setState({ runningTotal })
    }

    test = () => {
      let budgetObj = JSON.parse(JSON.stringify(this.state))
      this.props.setCategoriesBudget(budgetObj)
    }

    render () {
      const { budgetCat } = this.state

      return (
        <div>
          <form>
            <p>Set your target spend for each category ...</p>
            <br />
            <div>
              <select name='timeframe' onChange={this.handleDropdown}>
                {
                  timeFrames.map(timeframe => <option value={timeframe} key={timeframe}>{timeframe}</option>)
                }
                <p>basis...</p>
              </select>
            </div>
            <div>
              {
                Object.keys(this.state.budgetCat).map(key =>
                  <div key={key}>
                    <label>{key}</label>
                    <input type='text' name={key}
                      onSelect={this.calcTotal}
                      onChange={this.handleChange}
                      placeholder={budgetCat[key]} />
                  </div>
                )
              }
            </div>
            <p>For a total spend of £{this.state.runningTotal} on a {this.state.timeframe}</p>
            <input type='submit' value='Save Changes' onClick={this.handleSubmit} />
          </form>

        </div>
      )
    }
}

export default BudgetSettings
