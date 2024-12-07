import {
  AppBar,
  Box,
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
import { toast } from "react-toastify";
import { GetUserDetails } from "../common/getdata";
import moment from 'moment';
import photo from '../assets/photo.png';
import { FaRegEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import navbarlogo from "../assets/studentlogin.png";
// import { FaRegUserCircle } from "react-icons/fa";
// import user from "../assets/user-image.jpg";
// import document from "../assets/document.jpg";
// import { AuthContext } from "./context/AuthContext";

function StudentDetails({ isOpen, setIsOpen, setUser, profileDetails }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const urlSearchString = window. location.search; 
  // const params = new URLSearchParams(urlSearchString);
  // const tokenString = params.get("token")
  // if (tokenString) {
  //   localStorage.setItem('tokenGet', tokenString);
  // }
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state?.studentData.userData;
  const [isChecked, setIsChecked] = useState(false);
  const [ProfileDetails, setProfileDetails] = useState();
  const [show, setShow] = useState(false);
  const [editField, setEditField] = useState(""); // Field to edit
  const [editValue, setEditValue] = useState(""); // Value of the field being edited

  const handleClose = () => setShow(false);
  const handleShow = (field, value) => {
    setEditField(field); // Set the field to edit
    setEditValue(value); // Set the current value to edit
    setShow(true);
  };

  const handleInputChange = (event) => {
    setEditValue(event.target.value);
  };

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
    // GetprofileDetails()
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
      // setIsLoading(true)

    }
  }

  const handleSaveChanges = async (field, value, key) => {
    console.log(`Updated ${editField}:`, editValue);
    handleClose();
  }

  return (
    <div className="offcanvas-bg" style={{ marginBottom: "72px" }}>
      <Box className="w-100">
        <AppBar position="static">
          <Toolbar className="d-flex justify-content-center align-items-center">
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
            <img src={photo} width={40} height={40} style={{ marginRight: 10 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              STUDENT PROFILE
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
      <div className="m-2 mt-4" style={{ padding: '20px', border: '1px solid #9f9393' }}>
        <div className="d-flex justify-content-center mb-3" >
          <img src={storedUser?.userImage} alt="Student" width={200} height={150} />
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>STUDENT NAME</div>
          <div>{storedUser?.candidate_Name}</div>
          {/* <FaRegEdit onClick={() => handleShow('candidate_Name', storedUser?.candidate_Name)} /> */}
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>FATHER NAME</div>
          <div>{storedUser?.fatherName}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>GENDER</div>
          <div>{storedUser?.gender}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>SCHOOL NAME</div>
          <div>{storedUser?.schoolCode}-{storedUser?.schoolName}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>ENROLLMENT NUMBER</div>
          <div>{storedUser?.enrollmentNo}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>CLASS</div>
          <div>{storedUser?.classId}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>DATE OF BIRTH</div>
          <div> {storedUser?.dateOfBirth ? moment(storedUser.dateOfBirth).format('DD/MM/YYYY') : ""}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>MOBILE NUMBER</div>
          <div>{storedUser?.mobileNo}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>EMAIL ID</div>
          <div>{storedUser?.emailId}</div>
        </div>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>STUDENT PROFILE EDIT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Edit {editField.replace(/_/g, ' ')}</Form.Label>
                <Form.Control
                  type="text"
                  value={editValue}
                  onChange={handleInputChange}
                  placeholder={`Enter ${editField.replace(/_/g, ' ')}`}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* {isLoading ? <div className="text-center mt-5"><CircularProgress size={40} style={{ color: "black", }} /></div> : <div className="">
        <Grid className="m-2">
          <Grid item xs={12}>
            <Card className="border border-primary rounded" style={{ marginBottom: "80px" }}>
              <CardContent>
                <Typography variant="h5" color="primary" className="mb-3">
                  Student Details
                </Typography>

                <table className="w-100">
                  <tbody>
                    <tr className=" border-top border-bottom">
                      <td className="py-1 ">
                        <strong>Student Name</strong>
                      </td>
                      <td align="right">{storedUser?.candidate_Name}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Father's Name</strong>
                      </td>
                      <td align="right">{storedUser?.fatherName}</td>
                    </tr>
                    <tr className=" border-top border-bottom">
                      <td className="py-1" >
                        <strong>Enrollment No</strong>
                      </td>
                      <td align="right">{storedUser?.enrollmentNo}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Class</strong>
                      </td>
                      <td align="right">{storedUser?.classId}</td>
                    </tr>
                    <tr className=" border-top border-bottom">
                      <td className="py-1">
                        <strong>D.O.B</strong>{" "}
                      </td>
                      <td align="right">  {storedUser?.dateOfBirth
                        ? moment(storedUser.dateOfBirth).format('DD/MM/YYYY')
                        : ""}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Mobile Number</strong>
                      </td>
                      <td align="right">{storedUser?.mobileNo}</td>
                    </tr>
                    <tr className=" border-top border-bottom">
                      <td className="py-1">
                        <strong>Gender</strong>
                      </td>
                      <td align="right">{storedUser?.gender}</td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <strong>Email ID</strong>
                      </td>
                      <td align="right">{storedUser?.emailId}</td>
                    </tr>
                    <tr className=" border-top border-bottom ">
                      <td className="py-1">
                        <strong>School Name</strong>
                      </td>
                      <td align="right">{storedUser?.schoolName}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container mt-4">
                  <div className="d-flex justify-content-center">
                    <img src={`data:image/jpeg;base64,${storedUser?.userImage}`} alt="Student" className="w-50" />
                  </div>
                </div>
              
                <Row className="w-100">
               
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
               
                </Row>
                <div className="text-center">
                  <Button
                    variant="contained"
                    
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

      </div>} */}
    </div>
  );
}

export default StudentDetails;
