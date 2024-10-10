import React from 'react'
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import navbarlogo from '../assets/studentlogin.png'
import { FaRegUserCircle } from "react-icons/fa";


const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#f8f9fa" }}>
            <Container fluid>
                <Toolbar className="d-flex justify-content-between">
                    {/* Navbar Brand with Image */}
                    <a className="navbar-brand" href="#">
                        <img
                            src={navbarlogo}
                            alt="Kamp Logo"
                            width="100"
                            height="50"
                        />
                    </a>

                    {/* Navbar Text */}
                    <Typography sx={{ color: "#007bff" }}>
                        National 
                    </Typography>

                    {/* Navbar Links */}

                    <a className="nav-link d-flex justify-content-center align-items-center" style={{ color: "#000" }} >
                    <FaRegUserCircle /> NASTA 2023
                    </a>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar