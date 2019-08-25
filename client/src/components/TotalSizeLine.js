import React, { Component } from 'react';
import { Scatter } from "react-chartjs-2";

import * as Constants from './helper/constants';
import { titleCase } from './helper/functions';

class TotalSizeLine extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                datasets: [{
                    label: `${props.name} Packets`,
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: Constants.COLOR1,
                    backgroundColor: Constants.COLOR1,
                    ...this.setPointColor(Constants.COLOR1)
                }, {
                    label: `${props.name} TCP`,
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: Constants.COLOR2,
                    backgroundColor: Constants.COLOR2,
                    ...this.setPointColor(Constants.COLOR2)
                }, {
                    label: `${props.name} HTTP`,
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: Constants.COLOR3,
                    backgroundColor: Constants.COLOR3,
                    ...this.setPointColor(Constants.COLOR3)
                }, {
                    label: `${props.name} UDP`,
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: Constants.COLOR4,
                    backgroundColor: Constants.COLOR4,
                    ...this.setPointColor(Constants.COLOR4)
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio:false,
                onClick: (e,i) => {
                    console.log(i)
                    if (i.length > 0) props.handleClick(i[0]._index)
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            callback: (value) => (
                                this.getLabelTime(value)
                            ),
                            stepSize: 300
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            return data.datasets[tooltipItem.datasetIndex].label
                        },
                        footer: (tooltipItem, data) => {
                            let label = [`Time: ${this.getLabelTime(tooltipItem[0].xLabel)}`]
                            if (data.datasets[tooltipItem[0].datasetIndex].pointStyle[tooltipItem[0].index] === Constants.DC){
                                label.push("Capture machine disconnected")
                            } else {
                                label.push(`${props.name}: ${tooltipItem[0].yLabel}`)
                                label.push(`Anomaly: ${data.datasets[tooltipItem[0].datasetIndex].pointStyle[tooltipItem[0].index] === Constants.ANOMALY}`)
                            }
                            
                            return label
                        }
                    }
                }
            }
        }
    }
    setPointColor(color) {
        return {
            pointBorderColor: color,
            pointBackgroundColor: color,
            pointHoverBackgroundColor: color,
            pointHoverBorderColor: color,
        }
    }

    getLabelTime(seconds) {
        let date = new Date(seconds*1000)
        let hrs = date.getHours();
        let min = date.getMinutes();
        return `${hrs < 10 ? "0" + hrs : hrs}:${min < 10 ? "0" + min : min}`
    }

    componentWillReceiveProps({ packetList, name }) {
        name = name.toLowerCase()
        let that = this
        this.setState({
            data: {
                ...that.state.data,
                datasets: ['', '_tcp', '_http', '_udp'].map((v, i) => ({
                    ...that.state.data.datasets[i],
                    label: v === '' ? titleCase(`${name}_packets`) : titleCase(`${name}${v}`),
                    data: packetList.map(packet => ({
                        x: packet.timestamp,
                        y: packet[`${name}${v}`]
                    })),
                    ...this.setPointColor(packetList.map(packet => {
                        if (!packet.connected){
                            return Constants.DANGER
                        }
                        if (packet[`${name}${v}_score`] >= 0.9){
                            return Constants.WARNING
                        }
                        return Constants[`COLOR${i+1}`] 
                    })),
                    pointStyle: packetList.map(packet =>{
                        if (!packet.connected){
                            return Constants.DC
                        }
                        if (packet[`${name}${v}_score`] >= 0.9){
                            return Constants.ANOMALY
                        }
                        return Constants.NORMAL
                    }),
                    pointRadius: packetList.map(packet => {
                        if (!packet.connected){
                            return 9
                        }
                        if (packet[`${name}${v}_score`] >= 0.9){
                            return 8
                        }
                        return 2
                    })
                }))
            },
            options:{
                ...that.state.options,
                scales: {
                    xAxes: [{
                        ...that.state.options.scales.xAxes[0],
                        ticks: {
                            ...that.state.options.scales.xAxes[0].ticks,
                            max: packetList[0].timestamp,
                            min: packetList[packetList.length - 1].timestamp
                        }
                    }]
                }
            }
        })
    }

    render() {
        return(
            <Scatter
                style={{...this.props.style}}
                data={this.state.data}
                options={this.state.options}
            />
        )
    }
}

export default TotalSizeLine;