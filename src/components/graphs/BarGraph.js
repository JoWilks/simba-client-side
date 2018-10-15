import React from 'react'
import { ResponsiveBar } from '@nivo/pie'
// import { connect } from 'react-redux'
import './Graphs.css'

const data = [
    {
      "country": "AD",
      "hot dog": 96,
      "hot dogColor": "hsl(345, 70%, 50%)",
      "burger": 106,
      "burgerColor": "hsl(169, 70%, 50%)",
      "sandwich": 195,
      "sandwichColor": "hsl(333, 70%, 50%)",
      "kebab": 141,
      "kebabColor": "hsl(27, 70%, 50%)",
      "fries": 181,
      "friesColor": "hsl(71, 70%, 50%)",
      "donut": 176,
      "donutColor": "hsl(340, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 137,
      "hot dogColor": "hsl(132, 70%, 50%)",
      "burger": 183,
      "burgerColor": "hsl(356, 70%, 50%)",
      "sandwich": 160,
      "sandwichColor": "hsl(23, 70%, 50%)",
      "kebab": 153,
      "kebabColor": "hsl(235, 70%, 50%)",
      "fries": 192,
      "friesColor": "hsl(245, 70%, 50%)",
      "donut": 128,
      "donutColor": "hsl(8, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 47,
      "hot dogColor": "hsl(201, 70%, 50%)",
      "burger": 173,
      "burgerColor": "hsl(343, 70%, 50%)",
      "sandwich": 0,
      "sandwichColor": "hsl(50, 70%, 50%)",
      "kebab": 193,
      "kebabColor": "hsl(7, 70%, 50%)",
      "fries": 99,
      "friesColor": "hsl(114, 70%, 50%)",
      "donut": 64,
      "donutColor": "hsl(343, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 88,
      "hot dogColor": "hsl(63, 70%, 50%)",
      "burger": 81,
      "burgerColor": "hsl(277, 70%, 50%)",
      "sandwich": 193,
      "sandwichColor": "hsl(320, 70%, 50%)",
      "kebab": 11,
      "kebabColor": "hsl(14, 70%, 50%)",
      "fries": 146,
      "friesColor": "hsl(53, 70%, 50%)",
      "donut": 105,
      "donutColor": "hsl(179, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 73,
      "hot dogColor": "hsl(48, 70%, 50%)",
      "burger": 143,
      "burgerColor": "hsl(152, 70%, 50%)",
      "sandwich": 104,
      "sandwichColor": "hsl(69, 70%, 50%)",
      "kebab": 46,
      "kebabColor": "hsl(88, 70%, 50%)",
      "fries": 90,
      "friesColor": "hsl(85, 70%, 50%)",
      "donut": 142,
      "donutColor": "hsl(84, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 53,
      "hot dogColor": "hsl(66, 70%, 50%)",
      "burger": 70,
      "burgerColor": "hsl(207, 70%, 50%)",
      "sandwich": 43,
      "sandwichColor": "hsl(84, 70%, 50%)",
      "kebab": 88,
      "kebabColor": "hsl(105, 70%, 50%)",
      "fries": 63,
      "friesColor": "hsl(97, 70%, 50%)",
      "donut": 158,
      "donutColor": "hsl(229, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 130,
      "hot dogColor": "hsl(194, 70%, 50%)",
      "burger": 172,
      "burgerColor": "hsl(228, 70%, 50%)",
      "sandwich": 190,
      "sandwichColor": "hsl(227, 70%, 50%)",
      "kebab": 182,
      "kebabColor": "hsl(89, 70%, 50%)",
      "fries": 120,
      "friesColor": "hsl(161, 70%, 50%)",
      "donut": 173,
      "donutColor": "hsl(24, 70%, 50%)"
    }
  ]

const test = [
    {   'date': 'Saturday 13th October',
        'eating_out': 13,
        'transport': 10,
        'groceries': 11,
        'shopping': 22,
        'personal_care': 4,
        'bills': 25,
        'finances': 0,
        'entertainment': 34,
        'expenses': 2,
        'family': 0,
        'general': 0,
        'holidays': 0
    },
    {   date: 'Sunday 14th October',
        'eating_out': 13,
        'transport': 10,
        'groceries': 11,
        'shopping': 22,
        'personal_care': 4,
        'bills': 25,
        'finances': 0,
        'entertainment': 34,
        'expenses': 2,
        'family': 0,
        'general': 0,
        'holidays': 0
    }
]

class BarGraph extends React.Component{

    // state = {
    //     isExpense: false
    // }

    render () {
        // make sure parent container have a defined height when using responsive component,
        // otherwise height will be 0 and no chart will be rendered.
        // website examples showcase many properties, you'll often use just a few of them.
       
        return (
                <div className='wrapper'>
                    <div className='donut-graph'>
                    <ResponsiveBar
                        data={data}
                        keys={[
                            "hot dog",
                            "burger",
                            "sandwich",
                            "kebab",
                            "fries",
                            "donut"
                        ]}
                        indexBy="country"
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
                            "legendPosition": "center",
                            "legendOffset": 36
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "food",
                            "legendPosition": "center",
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
                                "anchor": "bottom-right",
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
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemOpacity": 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                    </div>
                    </div>
                )
        }
}

// const mapStateToProps = state => ({
//     categories: state.categoriesReducer
// })


export default BarGraph

// connect(mapStateToProps, null)