import React, { Component } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

import PortMacList from "./PortMacList";
import TotalSizeLine from "./TotalSizeLine";
import * as Constant from "./helper/constants";

class HistoryPage extends Component {
    constructor(props){
        super(props)
        this.state= {
            url: Constant.URL,
            hour: 1566593922,
            packets: [],
            activePacket: {
              port_src: [],
              port_src_tcp: [],
              port_src_udp: [],
              port_dst: [],
              port_dst_tcp: [],
              port_dst_udp: [],
              mac_src: [],
              mac_dst: []
            },
            pieTotal: {
                labels: [
                    `Total TCP`,
                    `Total UDP`
                ],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        Constant.COLOR1,
                        Constant.COLOR2
                    ],
                    hoverBackgroundColor: [
                        Constant.COLOR1,
                        Constant.COLOR2
                    ]
                }]
            },
            pieSize: {
                labels: [
                    `Size TCP`,
                    `Size UDP`
                ],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        Constant.COLOR1,
                        Constant.COLOR2
                    ],
                    hoverBackgroundColor: [
                        Constant.COLOR1,
                        Constant.COLOR2
                    ]
                }]
            }
        }
    }

    componentDidMount() {
        console.log(this.props.location)
        let that = this
        if (this.props.location.data) {
            axios.get(`${this.state.url}/packets/hour/${this.props.location.data.timestamp}`).then(res => {
                console.log(res)
                that.setState({
                    packets: res.data.reverse(),

                    // pieTotal: {
                    //     ...that.state.pieTotal,
                    //     datasets: [{
                    //         ...that.state.pieTotal.datasets,
                    //         data: [that.props.location.data[`total_tcp`], that.props.location.data[`total_udp`]]
                    //     }]
                    // },
                    // pieSize: {
                    //     ...that.state.pieSize,
                    //     datasets: [{
                    //         ...that.state.pieSize.datasets,
                    //         data: [that.props.location.data[`size_tcp`], that.props.location.data[`size_udp`]]
                    //     }]
                    // },
                }, () => { this.handleLineClick(this.state.packets.findIndex(({id}) => id === this.props.location.data.id)) })
            })
        } else {
            axios.get(`${this.state.url}/packets/hour/${this.state.hour}`).then(res => {
                let packets = res.data.reverse()
                that.setState({
                    packets
                }, () => { this.handleLineClick(this.state.packets.length-1) })
            })
        }
    }

    handleLineClick(i){
        let that = this
        axios.get(`${this.state.url}/packets/${this.state.packets[i].id}`).then(res => {
            that.setState({
                activePacket: res.data,
                pieTotal: {
                    ...that.state.pieTotal,
                    datasets: [{
                        ...that.state.pieTotal.datasets,
                        data: [res.data[`total_tcp`], res.data[`total_udp`]]
                    }]
                },
                pieSize: {
                    ...that.state.pieSize,
                    datasets: [{
                        ...that.state.pieSize.datasets,
                        data: [res.data[`size_tcp`], res.data[`size_udp`]]
                    }]
                },
            })
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>

                </Row>
                <Row>
                    <Col md={8} style={{maxHeight: "70vh"}}>
                        <Card style={{height: "70vh"}}>
                            <TotalSizeLine
                                style={{height: "70vh"}}
                                packetList={this.state.packets}
                                name="Total"
                                handleClick={i=>{this.handleLineClick(i)}}
                            />
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card>
                            <Pie
                                data={this.state.pieTotal}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio:false,
                                }}
                            />
                        </Card>
                        <Card>
                            <Pie
                                data={this.state.pieSize}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio:false,
                                }}
                            />
                        </Card>
                    </Col>
                    <Col md={2}>
                        <PortMacList activePacket={this.state.activePacket}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default HistoryPage;