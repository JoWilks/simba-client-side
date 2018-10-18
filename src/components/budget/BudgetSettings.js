import React from 'react'
import { moment } from '../../datefunctions'
import API from '../../adapters/API'

const timeFrames = ['monthly basis', 'weekly basis', 'daily basis']


class BudgetSettings extends React.Component {
    
        constructor(props) {
            super(props)
                this.state = {
                    timeframe: 'monthly basis',
                    budgetCat: {eating_out: 0,
                        transport: 0,
                        groceries: 0,
                        shopping: 0,
                        personal_care: 0,
                        bills: 0,
                        finances: 0,
                        entertainment: 0,
                        expenses: 0,
                        family: 0,
                        general: 0,
                        holidays: 0},
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

        handleSubmit = () => {
            //on submit will put changes into redux store, which will also Post request it to rails server
            let budgetObj = JSON.parse(JSON.stringify(this.state))
            this.props.setCategoriesBudget(budgetObj)
            // API.set_categories_budgets(budgetObj).then(data => console.log(data))

        }
    
        calcTotal = () => {
            let runningTotal = 0
            this.props.categories.forEach(category => {
                runningTotal += (this.state.budgetCat[category])
            })
            this.setState({ runningTotal })
        }

        test = () => {
            let budgetObj = JSON.parse(JSON.stringify(this.state))
            this.props.setCategoriesBudget(budgetObj)
        }

        render () {
            return (
                <div>
                        <button onClick={this.handleSubmit}></button>  
                        <form onSubmit={this.handleSubmit}>
                            Set your target spend for each category on a...
                            <br></br>
                            <select name='timeframe' onChange={this.handleDropdown}>
                                {
                                    timeFrames.map(timeframe => 
                                    <option value={timeframe} key={timeframe}>{timeframe}</option>
                                    )
                                }
                            </select>
                            {
                                this.props.categories.map(category => 
                                    <div>
                                        <label key={category}>{category}</label>
                                        <input type='text' name={category} onSelect={this.calcTotal} onChange={this.handleChange} placeholder={null}></input>
                                    </div>
                                )
                            }
                            <p>For a total spend of £{this.state.runningTotal} on a {this.state.timeframe}</p>
                            <input type='submit' value='Save Changes'></input>
                        </form>


                </div>
            )
        }
    
    
}


export default BudgetSettings