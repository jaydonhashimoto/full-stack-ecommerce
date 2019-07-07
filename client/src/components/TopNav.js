import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export class TopNav extends Component {
    render() {
        return (
            <div>
                <Navbar color='light' >
                    <NavbarBrand href='/' style={navLinkStyle}>Fake eBook Store</NavbarBrand>
                    <Nav className="ml-auto">
                        <NavItem >
                            <NavLink href='#' style={navLinkStyle}>Add eBook</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='#' style={navLinkStyle}>Sign In</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='#' style={navLinkStyle}>Register</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='#' style={navLinkStyle}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const navLinkStyle = {
    textDecoration: 'none',
    color: 'black'
}

export default TopNav
