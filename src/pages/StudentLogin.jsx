import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Link,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
} from "@mui/material";
import student from "../assets/studentlogin.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { StudentGenerateOTP } from "../common/getdata";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";

function StudentLogin() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    common: "",
    enrollment: "",
    dateOfBirth: "" ,
  });
 
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [error, setError] = useState({
    common: "",
    enrollment: "",
    dateOfBirth: null,
  });
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      // Check if common has a value; if so, set dateOfBirth to null
      if (name === "common" && value) {
        newData.dateOfBirth = null; // Set dateOfBirth to null if common has value
      }
      return newData;
    });

    // Handle dateOfBirth specific value check
    if (e.target.name === "dateOfBirth" && e.target.value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }

    // Reset error messages
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newError = {};

    if (!loginData.common && !loginData.enrollment) {
      newError.common = "Mobile number or email ID or Enrollment number is required";
      valid = false;
    }
    // if (!loginData.enrollment) {
    //   newError.enrollment = "Enrollment number is required";
    //   valid = false;
    // }
    if (!loginData.dateOfBirth && loginData.enrollment) {
      newError.dateOfBirth = "Date of Birth is required";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleSubmit = async (e) => {
    // alert("test1")
    e.preventDefault();
    setLoading(true);
    const isValid = validateForm();
    if (!isValid) {
        setLoading(false);
        return;
    }
    try {

      const response = await StudentGenerateOTP(loginData);
      setAuthData(response.data);
      // alert(`2 - ${JSON.stringify(response.data)}`)
      if (response.data.status) {
        // alert("test3",response.data)
        toast.success(response.data.message);
        setLoading(false);
        navigate("/otp");
      } else {
        // alert(response.data.message,"test4");
        toast.error(response.data.message);
        setLoading(false);
      }
      setLoading(false)
    } catch (error) {
      // alert(`catch: ${error}`);
      
      setLoading(false);
      console.log("error-->", error);
    }
  };

  return (
    <div>
      <Box className="w-100">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/login")} // Move onClick handler here
            >
              <IoMdArrowRoundBack color="#000000" />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Login
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="login-container p-3 bg-white rounded shadow-sm">
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
            error={!!error.common}
            helperText={error.common}
            disabled={!!loginData.enrollment} 

          />
          <div className="text-center mb-0">OR</div>
          <TextField
          className="mt-0s"
            variant="outlined"
            fullWidth
            margin="normal"
            label="ENROLLMENT NUMBER"
            name="enrollment"
            value={loginData.enrollment}
            onChange={handleChange}
            error={!!error.enrollment}
            helperText={error.enrollment}
            disabled={!!loginData.common}
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
            value={loginData.dateOfBirth }
            onChange={(e) => handleChange(e)}
            error={!!error.dateOfBirth}
            helperText={error.dateOfBirth}
          />{" "}
          <Link  className="d-block text-end mb-3 font-weight-bold">
            Forgot Enrollment No./ DOB ?
          </Link>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#1a1aff" }}
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "GENERATE OTP"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
