import React from 'react'
import {
    Nav, Navbar, Container, Button
} from "react-bootstrap";

import { Link } from "react-router-dom";

// import image logo
import logo from "../assets/logo pens.png"

const Navbars = () => {
  return (
    <Navbar expand="lg">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="/mis105" className="d-flex align-items-center ">
          <h3 className=''>SILAB PENS</h3>
          <img src={logo} alt="imageLogo" style={{ width: "75px", height: "auto" }} className="mx-2 " />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
            <Nav
                className="my-2 my-lg-0"
                style={{ maxHeight: '150px' }}
                navbarScroll
            >
                <Link to="/mis105/SILAB/login" className="mx-3"><Button>Login</Button></Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navbars
