import React from 'react';
import { Container } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import axios from 'axios';

import TotalSizeChart from "./components/TotalSizeChart";
import PortMacList from './components/PortMacList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: "http://localhost:8888",
      socket: socketIOClient("http://localhost:8888/socket"),
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
    let that = this
    axios.get(this.state.url + "/packets?limit=10").then(res => {
      that.setState({packetList: res.data.reverse()})
    })
  }

  getPacket(id) {
    let that = this
    axios.get(`${this.state.url}/packets/${id}`).then(res =>{
      that.setState({activePacket: res.data})
    })
  }
  
  render() {
    return (
      <Container fluid>
        <TotalSizeChart
          packetList={this.state.packetList}
          handleClick={id=>{this.getPacket(id)}}
        />
        <PortMacList
          activePacket={this.state.activePacket}
        />
      </Container>
    );
  }
}

export default App;
