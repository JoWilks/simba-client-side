import React from 'react'
import PosNegLineGraph from './PosNegLineGraph'
import LineGraph from '../graphs/LineGraph'
import { moment } from '../../datefunctions'

class NetGraphview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <LineGraph lineGraphData={this.props.lineGraphData} />
      </div>
    )
  }
}

export default NetGraphview
