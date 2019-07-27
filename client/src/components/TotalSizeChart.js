import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Row, Col } from 'react-bootstrap';

class TotalSizeChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            data1: {
                datasets: [{
                    label: "Total Packets",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#324851',
                    backgroundColor: '#324851',
                    pointBorderColor: '#324851',
                    pointBackgroundColor: '#324851',
                    pointHoverBackgroundColor: '#324851',
                    pointHoverBorderColor: '#324851',
                }, {
                    label: "Total TCP",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#86AC41',
                    backgroundColor: '#86AC41',
                    pointBorderColor: '#86AC41',
                    pointBackgroundColor: '#86AC41',
                    pointHoverBackgroundColor: '#86AC41',
                    pointHoverBorderColor: '#86AC41',
                }, {
                    label: "Total HTTP",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#34675C',
                    backgroundColor: '#34675C',
                    pointBorderColor: '#34675C',
                    pointBackgroundColor: '#34675C',
                    pointHoverBackgroundColor: '#34675C',
                    pointHoverBorderColor: '#34675C',
                }, {
                    label: "Total UDP",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#7DA3A1',
                    backgroundColor: '#7DA3A1',
                    pointBorderColor: '#7DA3A1',
                    pointBackgroundColor: '#7DA3A1',
                    pointHoverBackgroundColor: '#7DA3A1',
                    pointHoverBorderColor: '#7DA3A1',
                }]
            },
            data2: {
                datasets: [{
                    label: "Packets size",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#324851',
                    backgroundColor: '#324851',
                    pointBorderColor: '#324851',
                    pointBackgroundColor: '#324851',
                    pointHoverBackgroundColor: '#324851',
                    pointHoverBorderColor: '#324851',
                }, {
                    label: "TCP size",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#86AC41',
                    backgroundColor: '#86AC41',
                    pointBorderColor: '#86AC41',
                    pointBackgroundColor: '#86AC41',
                    pointHoverBackgroundColor: '#86AC41',
                    pointHoverBorderColor: '#86AC41',
                }, {
                    label: "HTTP size",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#34675C',
                    backgroundColor: '#34675C',
                    pointBorderColor: '#34675C',
                    pointBackgroundColor: '#34675C',
                    pointHoverBackgroundColor: '#34675C',
                    pointHoverBorderColor: '#34675C',
                }, {
                    label: "UDP size",
                    data: [],
                    showLine: true,
                    fill: false,
                    borderColor: '#7DA3A1',
                    backgroundColor: '#7DA3A1',
                    pointBorderColor: '#7DA3A1',
                    pointBackgroundColor: '#7DA3A1',
                    pointHoverBackgroundColor: '#7DA3A1',
                    pointHoverBorderColor: '#7DA3A1',
                }]
            },
            options: {
                onClick: (e,i) => {
                    if (i.length > 0) this.props.handleClick(i[0]._index)
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            callback: (value) => (
                                new Date(value*1000).toLocaleTimeString()
                            )
                        }
                    }]
                }
            }
        }
    }

    componentWillReceiveProps(nextProps){
        let that = this
        this.setState({
            data1: {
                ...that.state.data1,
                datasets: [{
                    ...that.state.data1.datasets[0],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.total
                    })),
                }, {
                    ...that.state.data1.datasets[1],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.total_tcp
                    })),
                }, {
                    ...that.state.data1.datasets[2],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.total_http
                    })),
                }, {
                    ...that.state.data1.datasets[3],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.total_udp
                    })),
                }]
            },
            data2: {...that.state.data1,
                datasets: [{
                    ...that.state.data2.datasets[0],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.size
                    }))
                }, {
                    ...that.state.data2.datasets[1],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.size_tcp
                    }))
                }, {
                    ...that.state.data2.datasets[2],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.size_http
                    }))
                }, {
                    ...that.state.data2.datasets[3],
                    data: nextProps.packetList.map(p => ({
                        x: p.timestamp,
                        y: p.size_udp
                    }))
                }]
            }
        })
    }

    render() {
        return (
            <Row>
                <Col sm={12} md={6}>
                    <Scatter
                        data={this.state.data1}
                        options={this.state.options}
                    />
                </Col>
                <Col sm={12} md={6}>
                    <Scatter
                        data={this.state.data2}
                        options={this.state.options}
                    />
                </Col>
            </Row>
        )
    }
}

export default TotalSizeChart;