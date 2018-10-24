import React from 'react'
import PosNegLineGraph from './PosNegLineGraph'
import LineGraph from '../graphs/LineGraph'
import { moment } from '../../datefunctions'

class NetGraphview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lineGraphData: []
    }
  }

  componentDidMount () {
    let data = JSON.parse(JSON.stringify(this.props.lineGraphData))
    data[0].data.forEach(obj => {
      obj.y /= 100
    })
    this.setState({ lineGraphData: data })
  }

  render () {
    return (
      <div>
        <LineGraph lineGraphData={this.state.lineGraphData} />
      </div>
    )
  }
}

export default NetGraphview
