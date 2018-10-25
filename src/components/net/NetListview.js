import React from 'react'
import NetTransactionview from './NetTransactionview'

class NetListview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {
    let net = JSON.parse(JSON.stringify(this.props.net))
    net.reverse()
    this.setState({ net: net })
  }

  render () {
    let net = JSON.parse(JSON.stringify(this.props.net))
    net.reverse()
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
