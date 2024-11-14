import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetUserDetails } from "../common/getdata";
import moment from 'moment';
import { Token } from "@mui/icons-material";
import { div } from "@tensorflow/tfjs";



// import navbarlogo from "../assets/studentlogin.png";
// import { FaRegUserCircle } from "react-icons/fa";
// import user from "../assets/user-image.jpg";
// import document from "../assets/document.jpg";
// import { AuthContext } from "./context/AuthContext";

function StudentDetails({ isOpen, setIsOpen, setUser, profileDetails }) {
  const urlSearchString = window. location.search; 
  const params = new URLSearchParams(urlSearchString);
  const tokenString = params.get("token")
  if (tokenString) {
    localStorage.setItem('tokenGet', tokenString);
  }
  const [isLoading, setIsLoading] = useState(false);
  console.log(tokenString, "tokenString");

  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state?.studentData.userData;
  const [isChecked, setIsChecked] = useState(false);
  const [ProfileDetails, setProfileDetails] = useState();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false); // Stop loading after 5 seconds
  //   }, 5000);

  //   return () => clearTimeout(timer); // Clean up the timer
  // }, []);
  // const toggleDrawer = (open) => () => {
  //   setIsOpen(open);
  // };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    GetprofileDetails()
  }, [])
  const GetprofileDetails = async () => {
    setIsLoading(true)
    try {
      const response = await GetUserDetails();
      if (response.data.status) {
        setIsLoading(false)
        setProfileDetails(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data)
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        setIsLoading(true)
      }
    } catch (error) {
      console.log("error-->", error);
      // setIsLoading(true)/

    }
  }

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
              onClick={() => setIsOpen(!isOpen)}
            >
              <IoMdMenu fontSize="30px" style={{ color: "#000000" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Details
            </Typography>
            {/* <div className="d-flex justify-content-between align-items-center gap-4"> */}
            {/* <a className="navbar-brand" href="#">
                <img src={navbarlogo} alt="Kamp Logo" width="75" height="50" />
              </a> */}
            {/* <Typography sx={{ color: "#FFFFFF" }}>National</Typography> */}

            {/* Navbar Links */}

            {/* <a
                className="nav-link d-flex justify-content-center align-items-center"
                style={{ color: "#FFFFFF" }}
              >
                <FaRegUserCircle /> NASTA 2023
              </a> */}
            {/* </div> */}
          </Toolbar>
        </AppBar>
      </Box>
      {isLoading ? <div className="text-center mt-5"><CircularProgress size={40} style={{ color: "black" ,}} /></div>  : <div>
        {/* // <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}> */}
        <Grid className="m-2">
          {/* Student Details Section */}
          <Grid item xs={12}>
            <Card className="border border-primary rounded">
              <CardContent>
                <Typography variant="h5" color="primary" className="mb-3">
                  Student Details
                </Typography>
                {/* <hr /> */}
                <table className="w-100">
                  <tbody>
                    <tr className=" border-top border-bottom">
                      <td className="py-1 ">
                        <strong>Student Name</strong>
                      </td>
                      <td align="right">{ProfileDetails?.candidate_Name}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Father's Name</strong>
                      </td>
                      <td align="right">{ProfileDetails?.fatherName}</td>
                    </tr>
                    <tr className=" border-top border-bottom">
                      <td className="py-1" >
                        <strong>Enrollment No</strong>
                      </td>
                      <td align="right">{ProfileDetails?.enrollmentNo}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Class</strong>
                      </td>
                      <td align="right">{ProfileDetails?.classId}</td>
                    </tr>
                    <tr className=" border-top border-bottom">
                      <td className="py-1">
                        <strong>D.O.B</strong>{" "}
                      </td>
                      <td align="right">  {ProfileDetails?.dateOfBirth
                        ? moment(ProfileDetails.dateOfBirth).format('DD/MM/YYYY')
                        : ""}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Mobile Number</strong>
                      </td>
                      <td align="right">{ProfileDetails?.mobileNo}</td>
                    </tr>
                    <tr className=" border-top border-bottom">
                      <td className="py-1">
                        <strong>Gender</strong>
                      </td>
                      <td align="right">{ProfileDetails?.gender}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Email ID</strong>
                      </td>
                      <td align="right">{ProfileDetails?.emailId}</td>
                    </tr>
                    <tr className=" border-top border-bottom ">
                      <td className="py-1">
                        <strong>School Name</strong>
                      </td>
                      <td align="right">{ProfileDetails?.schoolName}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  <div className="row  ">
                    <img src={`data:image/jpeg;base64,${ProfileDetails?.userImage}`} alt="Student" className="w-25 col" />
                    <img src={`data:image/jpeg;base64,${ProfileDetails?.userIdentityCard}`} alt="Document" className="w-25 col" />
                  </div>
                </div>
                {/* Declaration Checkbox */}
                <Row className="w-100">
                  {/* <Col> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheck}
                        color="primary"
                      />
                    }
                    label="I hereby declare that the above information is true and correct."
                  />
                  {/* </Col> */}
                </Row>
                <div className="text-center">
                  <Button
                    variant="contained"
                    // color="bule"
                    disabled={!isChecked}
                    style={{ fontWeight: "bold" }}
                    onClick={() => navigate("/examintroduction")}
                  >
                    PROCEED
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </div>}
    </div>
  );
}

export default StudentDetails;
