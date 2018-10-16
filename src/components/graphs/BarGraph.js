import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import './Graphs.css'

const data = [
    {
      "country": "AD",
      "hot dog": 37,
      "hot dogColor": "hsl(137, 70%, 50%)",
      "burger": 85,
      "burgerColor": "hsl(189, 70%, 50%)",
      "sandwich": 97,
      "sandwichColor": "hsl(262, 70%, 50%)",
    //   "kebab": 112,
    //   "kebabColor": "hsl(19, 70%, 50%)",
      "fries": 102,
      "friesColor": "hsl(266, 70%, 50%)",
      "donut": 72,
      "donutColor": "hsl(135, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 7,
      "hot dogColor": "hsl(65, 70%, 50%)",
      "burger": 0,
      "burgerColor": "hsl(99, 70%, 50%)",
      "sandwich": 96,
      "sandwichColor": "hsl(330, 70%, 50%)",
      "kebab": 128,
      "kebabColor": "hsl(23, 70%, 50%)",
      "fries": 186,
      "friesColor": "hsl(268, 70%, 50%)",
      "donut": 127,
      "donutColor": "hsl(282, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 78,
      "hot dogColor": "hsl(231, 70%, 50%)",
      "burger": 136,
      "burgerColor": "hsl(153, 70%, 50%)",
    //   "sandwich": 67,
    //   "sandwichColor": "hsl(35, 70%, 50%)",
      "kebab": 165,
      "kebabColor": "hsl(243, 70%, 50%)",
      "fries": 199,
      "friesColor": "hsl(224, 70%, 50%)",
      "donut": 12,
      "donutColor": "hsl(343, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 128,
      "hot dogColor": "hsl(157, 70%, 50%)",
      "burger": 0,
      "burgerColor": "hsl(304, 70%, 50%)",
      "sandwich": 67,
      "sandwichColor": "hsl(217, 70%, 50%)",
      "kebab": 123,
      "kebabColor": "hsl(267, 70%, 50%)",
      "fries": 196,
      "friesColor": "hsl(88, 70%, 50%)",
      "donut": 91,
      "donutColor": "hsl(234, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 164,
      "hot dogColor": "hsl(281, 70%, 50%)",
      "burger": 79,
      "burgerColor": "hsl(142, 70%, 50%)",
      "sandwich": 126,
      "sandwichColor": "hsl(300, 70%, 50%)",
      "kebab": 192,
      "kebabColor": "hsl(140, 70%, 50%)",
      "fries": 170,
      "friesColor": "hsl(287, 70%, 50%)",
      "donut": 181,
      "donutColor": "hsl(319, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 49,
      "hot dogColor": "hsl(97, 70%, 50%)",
      "burger": 92,
      "burgerColor": "hsl(42, 70%, 50%)",
      "sandwich": 49,
      "sandwichColor": "hsl(68, 70%, 50%)",
      "kebab": 168,
      "kebabColor": "hsl(322, 70%, 50%)",
      "fries": 53,
      "friesColor": "hsl(85, 70%, 50%)",
      "donut": 13,
      "donutColor": "hsl(297, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 131,
      "hot dogColor": "hsl(45, 70%, 50%)",
    //   "burger": 100,
    //   "burgerColor": "hsl(6, 70%, 50%)",
      "sandwich": 22,
      "sandwichColor": "hsl(30, 70%, 50%)",
      "kebab": 175,
      "kebabColor": "hsl(46, 70%, 50%)",
      "fries": 77,
      "friesColor": "hsl(88, 70%, 50%)",
      "donut": 157,
      "donutColor": "hsl(248, 70%, 50%)"
    }
  ]


// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
const BarGraph = props => (
<div className='wrapper'>
<div className='bar-graph'>
    <ResponsiveBar
        data={props.barGraphData}
        keys={props.categories}
        indexBy="date"
        margin={{
            "top": 50,
            "right": 130,
            "bottom": 50,
            "left": 60
        }}
        padding={0.3}
        colors="nivo"
        colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#38bcb2",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "fries"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "sandwich"
                },
                "id": "lines"
            }
        ]}
        borderColor="inherit:darker(1.6)"
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "country",
            "legendPosition": "start",
            "legendOffset": 36
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "food",
            "legendPosition": "start",
            "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "dataFrom": "keys",
                "anchor": "right",
                "direction": "column",
                "justify": false,
                "translateX": 120,
                "translateY": 0,
                "itemsSpacing": 2,
                "itemWidth": 100,
                "itemHeight": 20,
                "itemDirection": "left-to-right",
                "itemOpacity": 0.85,
                "symbolSize": 20,
                "effects": [
                    // {
                    //     "on": "hover",
                    //     "style": {
                    //         "itemOpacity": 1
                    //     }
                    // }
                ]
            }
        ]}
    />
</div>
</div>
)


export default BarGraph