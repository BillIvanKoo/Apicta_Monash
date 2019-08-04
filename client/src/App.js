import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import axios from 'axios';

import PacketLinePie from "./components/PacketLinePie";
import PortMacList from './components/PortMacList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8888",
      packetList: [],
      activePacket: {
        port_src: [],
        port_src_tcp: [],
        port_src_udp: [],
        port_dst: [],
        port_dst_tcp: [],
        port_dst_udp: [],
        mac_src: [],
        mac_dst: []
      }
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(`${endpoint}/socket`);
    socket.on("send packet list", data => this.setState({
      packetList: data.packets
    }))
  }

  getPacket(id) {
    let that = this
    console.log(id)
    axios.get(`${this.state.endpoint}/packets/${id}`).then(res =>{
      that.setState({activePacket: res.data})
    })
  }
  
  render() {
    return (
      <Container fluid style={{backgroundColor: "#86AC41"}}>
        <Row>
          <Col md={5}>
            <PacketLinePie
              name={"Total"}
              packetList={this.state.packetList}
              handleClick={i=>{this.getPacket(this.state.packetList[i].id)}}
            />
          </Col>
          <Col md={5}>
            <PacketLinePie
              name={"Size"}
              packetList={this.state.packetList}
              handleClick={i=>{this.getPacket(this.state.packetList[i].id)}}
            />
          </Col>
          <Col md={2}>
            <PortMacList
              activePacket={this.state.activePacket}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
