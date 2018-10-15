import React from 'react'
import { ResponsiveBar } from '@nivo/pie'
import { connect } from 'react-redux'
import './Graphs.css'

class BarGraph extends React.Component{

    state = {
        isExpense: false
    }

    // componentDidMount () {
    //     this.setState({ keys: this.props.barGraphData.keys() })
    // }

    render () {
        // make sure parent container have a defined height when using responsive component,
        // otherwise height will be 0 and no chart will be rendered.
        // website examples showcase many properties, you'll often use just a few of them.
        console.log(`Bar Graph console.log`)
        console.log(this.props)
        return (
                <div className='wrapper'>
                    <div className='donut-graph'>
                        {/* <ResponsiveBar
                        data={this.props.barGraphData}
                        keys={this.props.debit}
                        indexBy="dateRange"
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
                        isInteractive={false}
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
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemOpacity": 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    /> */}
                    </div>
                    </div>
                )
        }
}

const mapStateToProps = state => ({
    categories: state.categoriesReducer
})


export default connect(mapStateToProps, null)(BarGraph)