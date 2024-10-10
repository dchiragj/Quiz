import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import otp from "../assets/otp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { StudentLoginWithOTP } from "../common/getdata";

function OtpVerification() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otpNum, setOtpNum] = useState(new Array(6).fill(""));
  const [otpData, setOtpData] = useState({});

  const handleChange = (value, index) => {
    const newOtpNum = [...otpNum];
    newOtpNum[index] = value;
    setOtpNum(newOtpNum);
    setOtpData({
      ...authData.data,
      otp: newOtpNum.join(""),
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await StudentLoginWithOTP(otpData);
      alert(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      if (!!response.data.status) {
        navigate("/mocktest");
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F5FF",
        height: "100vh",
        backgroundImage: `url(${otp})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <IconButton
        style={{ position: "absolute", top: 20, left: 20 }}
        aria-label="back"
        onClick={() => navigate("/studentlogin")}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Container
        className=" p-4 rounded shadow-sm"
        style={{ textAlign: "center", position: "relative" }}
      >
        {/* Back Arrow Icon */}

        {/* Envelope Icon */}
        <Box className="icon mt-5" mb={2}>
          <MailOutlineIcon style={{ fontSize: 50, color: "#4A4AFF" }} />
        </Box>

        {/* Title */}
        <Typography variant="h6" gutterBottom>
          We Have Sent Code Number To Your Phone
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>

        {/* OTP Box */}
        <Box
          className="otp-box d-flex justify-content-between mb-3"
          style={{ margin: "20px 0" }}
        >
          {otpNum.map((num, index) => (
            <TextField
              key={index}
              variant="outlined"
              fullWidth
              margin="normal"
              name="enrollment"
              value={num}
              onChange={(e) => handleChange(e.target.value, index)}
              className="mx-1 rounded"
              sx={{
                backgroundColor: "#E0F0FF",
                // width: "40px",
                fontSize: "24px",
                "& .MuiInputBase-input": {
                  textAlign: "center",
                },
              }}
            />
          ))}
        </Box>

        {/* Resend OTP Link */}
        <Typography variant="body2">
          Haven't received OTP?{" "}
          <span
            style={{ color: "#4A4AFF", cursor: "pointer" }}
            onClick={handleSubmit}
          >
            Resend
          </span>
        </Typography>

        {/* Sign In Button */}
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#4A4AFF", marginTop: "15px" }}
          onClick={handleSubmit}
        >
          Sign In ;
        </Button>
      </Container>
    </div>
  );
}

export default OtpVerification;
