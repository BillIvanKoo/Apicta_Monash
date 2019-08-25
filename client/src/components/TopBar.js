import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import * as Constants from "./helper/constants";

class TopBar extends Component {
    render() {
        return(
            <Navbar style={{height: "15vh", backgroundColor: Constants.COLOR2}}>
                <NavbarBrand>
                        <Image
                            src={process.env.PUBLIC_URL + '/bNetAnalytics.png'} 
                        />
                </NavbarBrand>
                <Navbar.Collapse>
                        <Nav.Link as={NavLink} to="/live" style={{color: Constants.COLOR1}}>Live Feed</Nav.Link>
                        <Nav.Link as={NavLink} to="/anomalies" style={{color: Constants.COLOR1}}>Anomalies</Nav.Link>
                        <Nav.Link as={NavLink} to="/historical" style={{color: Constants.COLOR1}}>Historical</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopBar