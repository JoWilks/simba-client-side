import React from 'react'
import Transactionview from './Transactionview'

class Listview extends React.Component {
  render () {
    //removed .reverse()
    const transactions = this.props.transactions ? this.props.transactions : []
    return (
      <div>
        {
          this.props.transactions &&
                    transactions.map(transaction =>
                      <div key={transaction.id}>
                        <Transactionview transaction={transaction} /> <br />
                      </div>
                    )
        }
      </div>
    )
  }
}

export default Listview
