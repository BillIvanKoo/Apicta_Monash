import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import * as Constants from "./helper/constants";

class TopBar extends Component {

    handleAuth(){
        if (this.props.auth) {
            return (
                <Navbar.Collapse>
                        <Nav.Link as={NavLink} to="/live" style={{color: Constants.COLOR1}}>Live Feed</Nav.Link>
                        <Nav.Link as={NavLink} to="/anomalies" style={{color: Constants.COLOR1}}>Anomalies</Nav.Link>
                        <Nav.Link as={NavLink} to="/historical" style={{color: Constants.COLOR1}}>Historical</Nav.Link>
                        <Nav.Link as={NavLink} to="/" onClick={()=>{localStorage.clear()}} style={{color: Constants.COLOR1}}>Log Out</Nav.Link>
                </Navbar.Collapse>
            )
        }
    }
    render() {
        return(
            <Navbar style={{height: "7vh", backgroundColor: Constants.COLOR2}}>
                <NavbarBrand>
                        <Image
                            fluid
                            style={{height: "7vh"}}
                            src={process.env.PUBLIC_URL + '/bNetAnalytics.png'} 
                        />
                </NavbarBrand>
                {this.handleAuth()}
            </Navbar>
        )
    }
}

export default TopBar