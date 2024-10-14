import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import navbarlogo from "../assets/studentlogin.png";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    // <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
    //   <Container fluid>
    //     <Toolbar className="d-flex justify-content-between">
    //       {/* Navbar Brand with Image */}
    //       <a className="navbar-brand" href="#">
    //         <img src={navbarlogo} alt="Kamp Logo" width="100" height="50" />
    //       </a>

    //       {/* Navbar Text */}
    //       <Typography sx={{ color: "#ffffff" }}>National</Typography>

    //       {/* Navbar Links */}

    //       <a
    //         className="nav-link d-flex justify-content-center align-items-center"
    //         style={{ color: "#ffffff" }}
    //       >
    //         <FaRegUserCircle /> NASTA 2023
    //       </a>
    //     </Toolbar>
    //   </Container>
    // </AppBar>
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Container>
        <Toolbar className="d-flex justify-content-between">
          {/* {/ Navbar Brand with Image /} */}
          <a className="navbar-brand" href="#">
            <img src={navbarlogo} alt="Kamp Logo" width="100" height="50" />
          </a>

          {/* {/ Navbar Text /} */}
          <Typography sx={{ color: "#FFFFFF" }}>National</Typography>

          {/* {/ Navbar Links /} */}

          <a
            className="nav-link d-flex justify-content-center align-items-center"
            style={{ color: "#FFFFFF" }}
          >
            <FaRegUserCircle /> NASTA 2023
          </a>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
