import React, { Component } from 'react';
import Axios from 'axios';
import { Accordion, Card, ListGroup, Button } from 'react-bootstrap';

import { titleCase } from './helper/functions';

class AnomalyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packets: []
        }
    }

    componentDidMount() {
        let that = this
        Axios.get("http://localhost:8888/packets/anomalies").then(res => {
            that.setState({
                packets: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    handleClick(data) {
        this.props.history.push({
            pathname: "/historical",
            data
        })
    }

    render() {
        return(
            <Accordion>
                {this.state.packets.map(packet => (
                    <Card key={packet.id}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={packet.id}>
                                {new Date(packet.timestamp * 1000).toLocaleString()}
                            </Accordion.Toggle>
                            <Button onClick={()=>{this.handleClick(packet)}}>
                                Go to Historical &#10148;
                            </Button>
                        </Card.Header>
                        <Accordion.Collapse eventKey={packet.id}>
                            <Card.Body>
                                <ListGroup>
                                    {Object.keys(packet).filter(key => key !== "timestamp").map(key => {
                                        return(
                                            <ListGroup.Item key={key}>
                                                {titleCase(key)}: {"" + packet[key]}
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                ))}
            </Accordion>
        )
    }
}

export default AnomalyPage;