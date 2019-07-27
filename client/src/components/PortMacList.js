import React, { Component } from 'react';
import { ListGroup, InputGroup, FormControl, Tabs, Tab } from 'react-bootstrap';



class PortMacList extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchValue: ""
        }
    }

    handleType(e) {
        this.setState({searchValue: e.target.value})
    }

    handleList(key) {
        if (this.state.searchValue){
            const regEx = new RegExp(this.state.searchValue, 'g')
            return this.props.activePacket[key]
            .map(x=>''+x)
            .filter(x=>x.match(regEx))
            .map(x => (
                <ListGroup.Item key={x}>{x}</ListGroup.Item>
            ))
        }
        return this.props.activePacket[key].map(x => (
            <ListGroup.Item key={x}>{x}</ListGroup.Item>
        ))
        
    }

    render(){
        return (
            <div>
                <InputGroup>
                    <FormControl
                        placeholder="filter value"
                        onChange={(e)=>{this.handleType(e)}}
                    />
                </InputGroup>
                <Tabs>
                    {Object.keys(this.props.activePacket)
                        .filter(key => Array.isArray(this.props.activePacket[key]))
                        .map(key => (
                            <Tab eventKey={key} title={key} key={key}>
                                <ListGroup
                                    style={{
                                        maxHeight: "400px",
                                        overflowY: "scroll"
                                    }}
                                >
                                    {this.handleList(key)}
                                </ListGroup>
                            </Tab>
                        ))}
                </Tabs>
            </div>    
        )
    }
}

export default PortMacList;