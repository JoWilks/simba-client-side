import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import './Graphs.css'

//   const data2 = [
//         {id: 'positive :)',
//             data: [
//                 {x: 0,y: 0.7},
//                 {x: 1,y: 0.9},
//                 {x: 2,y: 0.8}
//             ]},
//         {id: 'negative :(',
//             data: [
//                 {x: 5,y: 0},
//                 {x: 6,y: -0.3},
//                 {x: 7,y: -0.5}
//             ]}
// ]

class LineGraph extends React.Component {
  render () {
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
    // website examples showcase many properties, you'll often use just a few of them.

    return (
      <div className='wrapper'>
        <div className='donut-graph'>

          <ResponsiveLine
            data={this.props.lineGraphData}
            margin={{
              'top': 50,
              'right': 110,
              'bottom': 50,
              'left': 60
            }}
            xScale={{
              'type': 'point'
            }}
            yScale={{
              'type': 'linear',
              'stacked': false,
              'min': 'auto',
              'max': 'auto'
            }}
            minY='auto'
            maxY='auto'
            stacked={false}
            curve='monotoneX'
            axisBottom={{
              'orient': 'bottom',
              'tickSize': 5,
              'tickPadding': 5,
              'tickRotation': 0,
              'legend': 'Dates',
              'legendOffset': 36,
              'legendPosition': 'center'
            }}
            axisLeft={{
              'orient': 'left',
              'tickSize': 5,
              'tickPadding': 5,
              'tickRotation': 0,
              'legend': 'Amount (£)',
              'legendOffset': -40,
              'legendPosition': 'center'
            }}
            dotSize={10}
            dotColor='inherit:darker(0.3)'
            dotBorderWidth={2}
            dotBorderColor='#ffffff'
            enableDotLabel
            dotLabel='y'
            dotLabelYOffset={-12}
            animate
            motionStiffness={90}
            motionDamping={15}
            legends={[]}
          />

        </div>
      </div>
    )
  }
}

export default LineGraph
