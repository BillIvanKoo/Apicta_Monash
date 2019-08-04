import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie, Scatter } from 'react-chartjs-2';

class PacketLinePie extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            line: {
                datasets: [{
                    label: `${props.name} Packets`,
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
                    label: `${props.name} TCP`,
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
                    label: `${props.name} HTTP`,
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
                    label: `${props.name} UDP`,
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
            pie: {
                labels: [
                    `${props.name} TCP`,
                    `${props.name} UDP`
                ],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#324851',
                        '#86AC41'
                    ],
                    hoverBackgroundColor: [
                        '#324851',
                        '#86AC41'
                    ]
                }]
            },
            lineOptions: {
                onClick: (e,i) => {
                    console.log(i)
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

    componentWillReceiveProps({ packetList, name }) {
        let recentPacket = packetList[packetList.length - 1]
        name = name.toLowerCase()
        let that = this
        this.setState({
            line: {
                ...that.state.line,
                datasets: ['', '_tcp', '_http', '_udp'].map((v, i) => ({
                    ...that.state.line.datasets[i],
                    data: packetList.map(packet => ({
                        x: packet.timestamp,
                        y: packet[`${name}${v}`]
                    }))
                }))
            },
            pie: {
                ...that.state.pie,
                datasets: [{
                    ...that.state.pie.datasets,
                    data: [recentPacket[`${name}_tcp`], recentPacket[`${name}_udp`]]
                }]
            }
        })
    }
    
    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Scatter
                            data={this.state.line}
                            options={this.state.lineOptions}
                        />
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Pie data={this.state.pie}/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default PacketLinePie;