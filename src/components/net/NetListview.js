import React from 'react'
import NetTransactionview from './NetTransactionview'

class NetListview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {
  }

  render () {
    let net = JSON.parse(JSON.stringify(this.props.net))
    return (
      <div>
        {
          net &&
                    net.map(item =>
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
