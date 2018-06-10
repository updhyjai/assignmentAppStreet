import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar className ="sticky-top shadow" color="light" light expand="md">
                        <NavbarBrand href="/"><h3>MY AWESOME SHOP</h3></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><h4>Home</h4></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/"><h4>About</h4></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/"><h4>Contact</h4></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/"><h4>Bag</h4></NavLink>
                            </NavItem>
                           
                           
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
