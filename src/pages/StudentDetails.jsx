import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import navbarlogo from "../assets/studentlogin.png";
import { FaRegUserCircle } from "react-icons/fa";
import user from "../assets/user-image.jpg";
import document from "../assets/document.jpg";

function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state?.studentData.userData;
  console.log(studentData, "data");

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
            >
              <Button>
                <ArrowBackIcon
                  fontSize="large"
                  onClick={() => navigate("/studentlogin")}
                  style={{ color: "#000000" }}
                />
              </Button>
            </IconButton>
            <div className="d-flex justify-content-between align-items-center gap-4">
              <a className="navbar-brand" href="#">
                <img src={navbarlogo} alt="Kamp Logo" width="75" height="50" />
              </a>
              <Typography sx={{ color: "#FFFFFF" }}>National</Typography>

              {/* Navbar Links */}

              <a
                className="nav-link d-flex justify-content-center align-items-center"
                style={{ color: "#FFFFFF" }}
              >
                <FaRegUserCircle /> NASTA 2023
              </a>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        {studentData ? (
          // <Box sx={{ maxWidth: '900px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <Grid className="m-2">
            {/* Student Details Section */}
            <Grid item xs={12}>
              <Card className="border border-primary rounded">
                <CardContent>
                  <Typography variant="h5" color="primary">
                    Student Details
                  </Typography>
                  <hr />
                  <table>
                    <tbody>
                      <tr>
                        <td className="">
                          <strong>Student Name: </strong>
                        </td>
                        <td>{studentData.userName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Father's Name: </strong>
                        </td>
                        <td>{studentData.fatherName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Enrollment No: </strong>
                        </td>
                        <td>{studentData.enrollMent}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Class: </strong>
                        </td>
                        <td>{studentData.class}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>D.O.B: </strong>{" "}
                        </td>
                        <td>{studentData.dateofBirth}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Mobile Number: </strong>
                        </td>
                        <td>{studentData.mobile}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Gender: </strong>
                        </td>
                        <td>{studentData.gender}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Email ID: </strong>
                        </td>
                        <td>{studentData.emailId}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>School Name: </strong>
                        </td>
                        <td>{studentData.schoolName}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <div className="row  ">
                      <img src={user} alt="Student" className="w-25 col" />
                      <img src={document} alt="Document" className="w-25 col" />
                    </div>
                  </div>
                  {/* Declaration Checkbox */}
                  <Box mt={2}>
                    <Checkbox />
                    <Typography display="inline">
                      I hereby declare that the above information is true and
                      correct.
                    </Typography>
                  </Box>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      color="warning"
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
        ) : (
          // </Box>
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
