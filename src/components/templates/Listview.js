import React from 'react'
import Transactionview from './Transactionview'

class Listview extends React.Component {
  render () {
    const transactions = this.props.transactions ? this.props.transactions.reverse() : []
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
