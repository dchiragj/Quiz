import React from "react";
import { Button, Container, Typography } from "@mui/material";
import loging from "../assets/login.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          // height: "calc(100vh - 144px)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="text-center p-4 d-flex flex-column justify-content-center align-item-center gap-5"
          style={{ maxWidth: "400px" }}
        >
          <img
            src={loging}
            alt="Illustration of a person standing next to a large padlock and a login form"
            className="w-100 h-50  object-fit-cover"
          />
          <Typography
            variant="h4"
            // className="mb-2"
            style={{ fontWeight: "bold", color: "#1A1A1A" }}
          >
            WELCOME
          </Typography>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>
            <div>
            <span style={{ color: '#1e90ff' }}>Knowledge</span> &
            <span style={{ color: '#1e90ff' }}> Awareness </span>
            </div>
            <div>
            <span>Mapping </span>
            <span style={{ color: "#6610f2" }}>Platform </span>
            <span> (KAMP)</span>
            </div>
          </div>
          {/* <h2>Knowledge & Awareness Mapping Platform </h2> */}
          <div className=" d-flex flex-column justify-content-center align-item-center gap-2">
            <Button
              variant="outlined"
              fullWidth
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#1A1A1A",
                borderColor: "#1A1A1A",
              }}
            >
              LOGIN AS SCHOOL
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              style={{ fontWeight: "bold" }}
              onClick={() => navigate("/studentlogin")}
            >
              LOGIN AS STUDENT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
