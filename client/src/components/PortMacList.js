import React, { Component } from 'react';
import { ListGroup, InputGroup, FormControl, Tabs, Tab, Nav, NavDropdown, DropdownButton, Dropdown } from 'react-bootstrap';

import { titleCase } from './helper/functions';
import { COLOR1 } from './helper/constants';

class PortMacList extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchValue: "",
            activeTitle: "Port Src"
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
                <Tab.Container defaultActiveKey="port_src">
                    <DropdownButton title={this.state.activeTitle}>
                        {Object.keys(this.props.activePacket)
                        .filter(key => Array.isArray(this.props.activePacket[key]))
                        .map(key => (
                            <Dropdown.Item
                                eventKey={key}
                                title={key}
                                key={key}
                                onSelect={()=>{
                                    this.setState({activeTitle: titleCase(key)})
                                }}
                            >
                                {titleCase(key)}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <Tab.Content>
                    {Object.keys(this.props.activePacket)
                            .filter(key => Array.isArray(this.props.activePacket[key]))
                            .map(key => (
                                <Tab.Pane eventKey={key} title={key} key={key}>
                                    <ListGroup
                                        style={{
                                            maxHeight: "400px",
                                            overflowY: "scroll"
                                        }}
                                    >
                                        {this.handleList(key)}
                                    </ListGroup>
                                </Tab.Pane>
                            ))}
                    </Tab.Content>
                </Tab.Container>
            </div>    
        )
    }
}

export default PortMacList;