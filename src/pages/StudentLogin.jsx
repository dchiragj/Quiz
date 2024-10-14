import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Link,
  IconButton,
} from "@mui/material";
import student from "../assets/studentlogin.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StudentGenerateOTP } from "../common/getdata";
import { AuthContext } from "./context/AuthContext";

function StudentLogin() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    common: "",
    enrollment: "",
    dateOfBirth: "",
  });
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    if (e.target.name == "dateOfBirth" && e.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await StudentGenerateOTP(loginData);
      setAuthData(response.data);
      alert(response.data.message);
      if (response.data.status) {
        navigate("/otp");
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="login-container p-4 bg-white rounded shadow-sm">
        <IconButton onClick={() => navigate("/login")}>
          <IoMdArrowRoundBack />
        </IconButton>
        <img
          src={student}
          alt="KAMP logo with a human head silhouette filled with dots and the text 'Knowledge & Awareness Mapping Platform'"
          className="img-fluid mb-3"
        />
        <Typography
          variant="h5"
          className="text-center mb-2"
          style={{ fontWeight: "bold" }}
        >
          STUDENT LOGIN
        </Typography>
        <Typography className="text-center text-muted mb-4">
          Kindly Login with your Credentials
        </Typography>
        <form>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="MOBILE NUMBER / EMAIL ID"
            name="common"
            value={loginData.common}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            label="ENROLLMENT NUMBER"
            name="enrollment"
            value={loginData.enrollment}
            onChange={handleChange}
          />
          <TextField
            onFocus={onFocus}
            onBlur={onBlur}
            // InputProps={{
            //   inputProps: { min: "2020-05-01", max: "2024-12-31" },
            // }}
            type={hasValue || focus ? "date" : "text"}
            variant="outlined"
            fullWidth
            margin="normal"
            label="DATE OF BIRTH"
            name="dateOfBirth"
            value={loginData.dateOfBirth}
            onChange={(e) => handleChange(e)}
          />{" "}
          <Link href="#" className="d-block text-end mb-3 text-muted">
            Forgot Enrollment No./ DOB ?
          </Link>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#1a1aff" }}
            onClick={handleSubmit}
          >
            GENERATE OTP
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default StudentLogin;
