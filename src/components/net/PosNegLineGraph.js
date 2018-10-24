import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import '../graphs/Graphs.css'
import Paper from '@material-ui/core/Paper'

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

class PosNegLineGraph extends React.Component {
  render () {
    // make sure parent container have a defined height when using responsive component,
    // otherwise height will be 0 and no chart will be rendered.
    // website examples showcase many properties, you'll often use just a few of them.

    return (
      <Paper className='bar-graph'>
        <ResponsiveLine
          // data={this.props.lineGraphData}
          data={[
            { id: 'positive :)',
              data: [
                { x: 24/10/18, y: 0 },
                { x: 25/10/18, y: 2 },
                { x: 28/10/18, y: 8.43 }
              ] },
            { id: 'negative :(',
              data: [
                { x: 26/10/18, y: -3.56 },
                { x: 27/10/18, y: -5.8 },
                { x: 29/10/18, y: -19.55 } ] }
          ]}
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
          animate
          curve='monotoneX'
          enableDotLabel
          dotSize={7}
          dotBorderWidth={1}
          dotBorderColor='inherit:darker(0.3)'
          dotLabelYOffset={-20}
          enableGridX={false}
          colors={['rgb(97, 205, 187)', 'rgb(244, 117, 96)']}
          xScale={{ type: 'linear' }}
          yScale={{
            type: 'linear',
            stacked: false,
            min: -1,
            max: 1
          }}
          enableArea
          areaOpacity={0.07}
        />

      </Paper>
    )
  }
}

export default PosNegLineGraph
