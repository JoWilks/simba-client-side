// import { render } from 'react-dom'
import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import Paper from '@material-ui/core/Paper'
import './Graphs.css'

class DonutGraph extends React.Component {
  render () {
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
    // website examples showcase many properties, you'll often use just a few of them.
    return (
      <Paper className='donut-graph'>
        <ResponsivePie
          data={this.props.donutGraphData}
          margin={{
            'top': 40,
            'right': 80,
            'bottom': 80,
            'left': 80
          }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors='nivo'
          colorBy='id'
          borderWidth={1}
          borderColor='inherit:darker(0.2)'
          radialLabelsSkipAngle={1}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor='#333333'
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={10}
          radialLabelsLinkHorizontalLength={10}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor='inherit'
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor='inherit'
          animate
          motionStiffness={90}
          motionDamping={15}
          defs={[
            {
              'id': 'dots',
              'type': 'patternDots',
              'background': 'inherit',
              'color': 'rgba(255, 255, 255, 0.3)',
              'size': 4,
              'padding': 1,
              'stagger': true
            },
            {
              'id': 'lines',
              'type': 'patternLines',
              'background': 'inherit',
              'color': 'rgba(255, 255, 255, 0.3)',
              'rotation': -45,
              'lineWidth': 6,
              'spacing': 10
            }
          ]}
          fill={[]}
          legends={[]}
        />
      </Paper>
    )
  }
}

export default DonutGraph
