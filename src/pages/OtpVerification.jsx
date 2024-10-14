import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  IconButton,
  TextField,
  AppBar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { StudentLoginWithOTP } from "../common/getdata";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Toolbar from "@mui/material/Toolbar";

function OtpVerification() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [otpNum, setOtpNum] = useState(new Array(6).fill(""));

  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtpNum = [...otpNum];
    newOtpNum[index] = value.slice(-1); // Only keep the last entered digit
    setOtpNum(newOtpNum);

    // Auto-focus the next input
    if (value !== "" && index < otpNum.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpNum[index] && index > 0) {
      // Move to previous input if backspace is pressed on an empty input
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otp = otpNum.join("");
    const otpData = {
      ...(authData?.data || {}),
      otp,
    };

    try {
      const response = await StudentLoginWithOTP(otpData);
      alert(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      if (response.data.status) {
        navigate("/studentdetails", {
          state: { studentData: response.data.data },
        });
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center ">
        <Box className="w-100">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigate("/studentlogin")} // Move onClick handler here
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                OTP Verification
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <div
          className="d-flex flex-column align-items-center justify-content-center px-3"
          style={{ height: "calc(100vh - 75px)" }}
        >
          <RiVerifiedBadgeLine style={{ fontSize: 50, color: "#4A4AFF" }} />
          <Typography variant="h6" gutterBottom textAlign={"center"}>
            We Have Sent Code Number To Your Phone
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            paragraph
            textAlign={"center"}
          >
            Please enter the verification code sent to your phone.
          </Typography>

          {/* {/ OTP Input Fields /} */}
          <Box
            className="otp-box d-flex justify-content-between mb-3"
            style={{ margin: "20px 0" }}
          >
            {otpNum.map((num, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                variant="outlined"
                value={num}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "24px" },
                }}
                className="mx-1"
                sx={{
                  width: "40px",
                  backgroundColor: "#E0F0FF",
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  },
                }}
              />
            ))}
          </Box>

          {/* {/ Resend OTP /} */}
          <Typography variant="body2">
            Haven't received OTP?{" "}
            <span
              style={{ color: "#4A4AFF", cursor: "pointer" }}
              onClick={handleSubmit}
            >
              Resend
            </span>
          </Typography>

          {/* {/ Submit Button /} */}
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#4A4AFF", marginTop: "15px" }}
            onClick={handleSubmit}
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
