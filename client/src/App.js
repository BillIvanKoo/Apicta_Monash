import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import socketIOClient from "socket.io-client";
import axios from 'axios';

import TopBar from './components/TopBar';
import LivePage from './components/LivePage';
import LandingPage from './components/LandingPage';
import AnomalyPage from './components/AnomalyPage';
import HistoryPage from './components/HistoryPage';

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
    socket.on("send packet list", data => {this.setState({
      packetList: data.packets
    })})
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
      <Router>
        <TopBar></TopBar>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/live" component={LivePage}/>
        <Route path="/anomalies" component={AnomalyPage}/>
        <Route path="/historical" component={HistoryPage}/>
      </Router>
    );
  }
}

export default App;
