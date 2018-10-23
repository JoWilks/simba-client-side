import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Paper from '@material-ui/core/Paper'

const BarGraph = props => (
  <Paper className='bar-graph'>
    <ResponsiveBar
      data={props.barGraphData}
      keys={props.categories}
      indexBy='date'
      margin={{
        'top': 50,
        'right': 130,
        'bottom': 50,
        'left': 60
      }}
      padding={0.3}
      colors='nivo'
      colorBy='id'
      defs={[
        {
          'id': 'dots',
          'type': 'patternDots',
          'background': 'inherit',
          'color': '#38bcb2',
          'size': 4,
          'padding': 1,
          'stagger': true
        },
        {
          'id': 'lines',
          'type': 'patternLines',
          'background': 'inherit',
          'color': '#eed312',
          'rotation': -45,
          'lineWidth': 6,
          'spacing': 10
        }
      ]}
      fill={[
        {
          'match': {
            'id': 'fries'
          },
          'id': 'dots'
        },
        {
          'match': {
            'id': 'sandwich'
          },
          'id': 'lines'
        }
      ]}
      borderColor='inherit:darker(1.6)'
      axisBottom={{
        'orient': 'bottom',
        'tickSize': 5,
        'tickPadding': 5,
        'tickRotation': 0,
        'legend': 'Start Date of Time Range',
        'legendPosition': 'start',
        'legendOffset': 36
      }}
      axisLeft={{
        'orient': 'left',
        'tickSize': 5,
        'tickPadding': 5,
        'tickRotation': 0,
        'legend': 'Amount (£)',
        'legendPosition': 'start',
        'legendOffset': -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor='inherit:darker(1.6)'
      animate
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          'dataFrom': 'keys',
          'anchor': 'right',
          'direction': 'column',
          'justify': false,
          'translateX': 120,
          'translateY': 0,
          'itemsSpacing': 2,
          'itemWidth': 100,
          'itemHeight': 20,
          'itemDirection': 'left-to-right',
          'itemOpacity': 0.85,
          'symbolSize': 20,
          'effects': []
        }
      ]}
    />
  </Paper>
)

export default BarGraph
