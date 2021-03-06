import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import socketIOClient from "socket.io-client";

import PacketLinePie from "./PacketLinePie";
import * as Constant from "./helper/constants";

class LivePage extends React.Component {
  constructor() {
    super();
    this.state = {
      endpoint: Constant.URL,
      socket: null,
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
    this.setState({
      socket: socketIOClient(`${endpoint}/socket`)
    }, () => {
      this.state.socket.on("send packet list", data => this.setState({
        packetList: data.packets
      }))
    })
  }

  componentWillUnmount() {
    if (this.state.socket){
      this.state.socket.disconnect();
    }
  }

  handleClick(data) {
    this.props.history.push({
      pathname: "/historical",
      data
    })
  }
  
  render() {
    return (
        <Container fluid style={{maxHeight: "85vh", backgroundColor: Constant.COLOR1}}>
          <Row style={{height: "85vh"}}>
            <Col md={6} style={{height: "85vh", padding: "0 0.75vw 0 2vw"}}>
              <PacketLinePie
                style={{height: "81.5vh"}}
                name={"Total"}
                packetList={this.state.packetList}
                handleClick={i=>{this.handleClick(this.state.packetList[i])}}
              />
            </Col>
            <Col md={6} style={{height: "85vh", padding: "0 2vw 0 0.75vw"}}>
              <PacketLinePie
                style={{height: "81.5vh"}}
                name={"Size"}
                packetList={this.state.packetList}
                handleClick={i=>{this.handleClick(this.state.packetList[i])}}
              />
            </Col>
          </Row>
        </Container>
    );
  }
}

export default LivePage;
