import React from 'react'
import NetTransactionview from './NetTransactionview'

class NetListview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      net: []

    }
  }
  componentDidMount () {

  }

  render () {
    return (
      <div>
        {
          this.props.net &&
                    this.props.net.reverse().map(item =>
                      <div key={item.x}>
                        <NetTransactionview item={item} key={item.x} /> <br />
                      </div>
                    )
        }
      </div>
    )
  }
}

export default NetListview
