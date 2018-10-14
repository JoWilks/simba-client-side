import React from 'react'
import DonutGraph from '../graphs/DonutGraph'

class Graphview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: []
        }
    }

    componentDidMount () {
        //parse transaction data from props then put in state, ****ISSUES WITH MORE THAN 2 DECIMALS****
        const data = []
        this.props.transactions.forEach(transaction => {
            if (data[transaction.category]) {
                data[transaction.category]['value'] +=  transaction.amount < 0 
                                                        ? (transaction.amount/-100)
                                                        : (transaction.amount/100)
            } else {
                let obj = {}
                obj['id'] = transaction.category
                obj['label'] = transaction.category
                obj['value'] = transaction.amount < 0
                                ? (transaction.amount/-100)
                                : (transaction.amount/100)
                data[transaction.category] = obj
            }
        })

        let newArray = []
        Object.keys(data).forEach(function (key) {
            newArray.push(data[key])
         });

        this.setState({ transactions: newArray })
    }

    render () {
        return (
            <div>
                <h1>Expenses</h1>
                <DonutGraph transactions={this.state.transactions}/>
                <button onClick={this.test}>Test</button>
            </div>
        )
    }


}


export default Graphview