import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

import TotalSizeLine from './TotalSizeLine';
import * as Constant from './helper/constants';

class PacketLinePie extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            pie: {
                labels: [
                    `${props.name} TCP`,
                    `${props.name} UDP`
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
        }
    }

    componentWillReceiveProps({ packetList, name }) {
        let recentPacket = packetList[packetList.length - 1]
        name = name.toLowerCase()
        let that = this
        this.setState({
            pie: {
                ...that.state.pie,
                datasets: [{
                    ...that.state.pie.datasets,
                    data: [recentPacket[`${name}_tcp`], recentPacket[`${name}_udp`]]
                }]
            },
        })
    }
    
    render() {
        return (
            <div style={{...this.props.style}}>
                <Card
                style={{margin: "2.5vh 0vh 1.25vh 0vh", height: "37.5vh"}}
                >
                    <Card.Body>
                        <TotalSizeLine
                            style={{maxHeight: "37.5vh"}}
                            packetList={this.props.packetList}
                            name={this.props.name}
                            handleClick={this.props.handleClick}
                        />
                    </Card.Body>
                </Card>
                <Card
                style={{margin: "1.25vh 0vh 2.5vh 0vh", height: "37.5vh"}}
                >
                    <Card.Body>
                        <Pie 
                            style={{maxHeight: "37.5vh"}}
                            data={this.state.pie}
                            options={{
                                responsive: true,
                                maintainAspectRatio:false,
                            }}
                        />
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default PacketLinePie;