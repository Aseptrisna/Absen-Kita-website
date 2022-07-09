import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import "../css/navbar.css"
import swal from "sweetalert"
import User from '../LocalStorage/User'
import {Navigate} from 'react-router-dom'

export default class NavbarComponent extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        }
    }

    logout() {
        User.Logout();
        this.setState({ redirectToReferrer: true });
        setInterval("window.location.reload()", 1000);
    }

    Konfirmasi() {
        swal({
            title: "Anda akan keluar dari sistem!",
            icon: "warning",
            dangerMode: true,
        }).then(yes => {
            if (yes) {
                this.logout();
            }
        });
    }

    render() {
        if (this.state.redirectToReferrer) {
            return <Navigate to={"/"} />
        }
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">SSO</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Users</Nav.Link>
                                <Nav.Link href="/apps">Apps</Nav.Link>
                            </Nav>
                            <Nav>
                                <button type='submit' onClick={() => this.Konfirmasi()}>Logout</button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
