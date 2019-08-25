import React, { Component } from "react";
import { Container, Row, Col, Card, Form, InputGroup, DropdownButton, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
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
            dateHour: 1566593922,
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
            },
            displayedDate: "",
            selectedView: "Total",
            inputDateValue: "",
            selectedHour: ""
        }
    }

    componentDidMount() {
        let that = this
        if (this.props.location.data) {
            axios.get(`${this.state.url}/packets/hour/${this.props.location.data.timestamp}`).then(res => {
                that.setState({
                    packets: res.data.sort((a,b)=>{
                        let x = b.timestamp; let y = a.timestamp;
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }),
                }, () => { that.handleLineClick(that.state.packets.findIndex(({id}) => id === this.props.location.data.id)) })
            })
        } else {
            this.handleSubmit()
        }
    }

    handleLineClick(i){
        let that = this
        axios.get(`${this.state.url}/packets/${this.state.packets[i].id}`).then(res => {
            let date = new Date(res.data.timestamp * 1000)
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
                displayedDate: date.toLocaleString(),
                inputDateValue: `${date.getFullYear()}-${(date.getMonth()+1 < 10 ? "0" : "") + (date.getMonth()+1)}-${(date.getDate() < 10 ? "0" : "") + date.getDate()}`,
                selectedHour: this.getHourRange(date.getHours())
            })
        })
    }

    getHourRange(startHour){
        return `${startHour<10?"0"+startHour:startHour}:00 - ${startHour + 1 === 24 ? "00" : ((startHour+1)<10?"0"+(startHour+1):(startHour+1))}:00`
    }

    handleSubmit(){
        let that = this
        axios.get(`${this.state.url}/packets/hour/${this.state.dateHour}`).then(res => {
            console.log(res.data);
            let packets = res.data.sort((a,b)=>{
                let x = b.timestamp; let y = a.timestamp;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
            that.setState({
                packets
            }, () => { that.handleLineClick(that.state.packets.length-1) })
        })
    }

    handleDateChange(dateString) {
        this.setState({
            inputDateValue: dateString
        }, this.updateDateHour)
    }

    handleHourSelect(hour){
        this.setState({
            selectedHour: this.getHourRange(hour),
        }, this.updateDateHour)
    }

    updateDateHour() {
        let date = new Date(this.state.inputDateValue)
        let unixDate = Math.floor(date.getTime()/1000)
        unixDate += date.getTimezoneOffset() * 60
        unixDate += (parseInt(this.state.selectedHour.substr(0,2))) * 3600
        return this.setState({
            dateHour: unixDate
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={8}>
                        <Form>
                            
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            Date and Hour
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="date"
                                        value={this.state.inputDateValue}
                                        onChange={(e)=>{this.setState({inputDateValue: e.target.value})}}
                                    />
                                    <Dropdown
                                        as={InputGroup.Append}
                                    >
                                        <Dropdown.Toggle>
                                            {this.state.selectedHour}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{height: "20vh", overflowY: "scroll"}}>
                                            {[...Array(24).keys()].map(i => {
                                                return (
                                                    <Dropdown.Item key={i} onSelect={()=>{this.handleHourSelect(i)}}>
                                                        {this.getHourRange(i)}
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <ButtonGroup as={InputGroup.Append}>
                                        <Button onClick={()=>{this.handleSubmit()}}>Submit</Button>
                                    </ButtonGroup>
                                    <DropdownButton
                                    as={InputGroup.Append}
                                    title={this.state.selectedView}
                                    >
                                        <Dropdown.Item onSelect={()=>{this.setState({selectedView: "Total"})}}>Total Number</Dropdown.Item>
                                        <Dropdown.Item onSelect={()=>{this.setState({selectedView: "Size"})}}>Total Size</Dropdown.Item>
                                    </DropdownButton>
                                </InputGroup>
                            
                        </Form>
                    </Col>
                    <Col md={4}>
                        Current displayed date and hour: {this.state.displayedDate}
                    </Col>
                </Row>
                <Row>
                    <Col md={8} style={{maxHeight: "70vh"}}>
                        <Card style={{height: "70vh"}}>
                            <TotalSizeLine
                                style={{height: "70vh"}}
                                packetList={this.state.packets}
                                name={this.state.selectedView}
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