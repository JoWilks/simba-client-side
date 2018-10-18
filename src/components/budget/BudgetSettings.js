import React from 'react'
import { moment } from '../../datefunctions'
import API from '../../adapters/API'

const timeFrames = ['monthly basis', 'weekly basis', 'daily basis']

class BudgetSettings extends React.Component {
    
        constructor(props) {
            super(props)
            const budgetCat = props.budget.categories
            const timeframe = props.budget.timeFrame
                this.state = {
                    timeframe,
                    budgetCat,
                    runningTotal: 0
                }
            }

        handleChange = (event) => {
            const value = Number(event.target.value) ? Number(event.target.value) : event.target.value
            const name = event.target.name
            this.setState(prev => ({ ...prev, budgetCat: { ...prev.budgetCat, [`${name}`]: value } }))
        }

        handleDropdown = (event) => {
            this.setState({ timeframe: event.target.value })
        }

        handleSubmit = (event) => {
            event.preventDefault()
            let budgetObj = JSON.parse(JSON.stringify(this.state))
            this.props.setCategoriesBudget(budgetObj)
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
            const { budgetCat} = this.state
            // Object.keys(this.state.budgetCat).map(l => console.log(budgetCat[l]))
            return (
                <div>
                        <form>
                            <p>Set your target spend for each category on a...</p>
                            <br></br>
                            <div>
                            <select name='timeframe' onChange={this.handleDropdown}>
                                {
                                    timeFrames.map(timeframe => <option value={timeframe} key={timeframe}>{timeframe}</option>)
                                }
                            </select>
                            </div>
                            <div>
                            { 
                                Object.keys(this.state.budgetCat).map(key => 
                                    <div key={key}>
                                        <label>{key}</label>
                                        <input type='text'  name={key} 
                                                            onSelect={this.calcTotal} 
                                                            onChange={this.handleChange} 
                                                            placeholder={budgetCat[key]}></input>
                                    </div>
                                )
                            }
                            </div>
                            <p>For a total spend of £{this.state.runningTotal} on a {this.state.timeframe}</p>
                            <input type='submit' value='Save Changes' onClick={this.handleSubmit}></input>
                        </form>


                </div>
            )
        }
    
    
}


export default BudgetSettings