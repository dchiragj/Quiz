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
import { GetUserDetails, UpdateStudentDetails } from "../common/getdata";
import moment from 'moment';
import photo from '../assets/photo.png';
import { FaRegEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { VscSaveAs } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
// import navbarlogo from "../assets/studentlogin.png";
// import { FaRegUserCircle } from "react-icons/fa";
import demo from "../assets/userimg.jpg";
// import document from "../assets/document.jpg";
// import { AuthContext } from "./context/AuthContext";

function StudentDetails({ isOpen, setIsOpen, setUser, profileDetails, onSave }) {
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
  // State management
  const [userDetails, setUserDetails] = useState({});
  const [formData, setFormData] = useState(userDetails);
  const [isEditing, setIsEditing] = useState(true);
  const [editedField, setEditedField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  console.log(formData, "formData");

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setEditedField(field);
  };

  const handleSaveClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    UpdateStudentDetail()
    GetprofileDetails()
  };

  const handleInputChange = (field, value) => {
    console.log("Updating field:", field, "with value:", value);
    setUserDetails((prev) => ({ ...prev, [field]: value }));
  };


  const UpdateStudentDetail = async () => {
    const updatedData = {
      studentName: null,
      fatherName: null,
      gender: null,
      enrollmentNo: userDetails.enrollmentNo, // Include the current enrollment number
      mobileNo: null,
      emailId: null,
      areaTypeID: null,
      stateID: null,
      districtID: null,
      cityID: null,
      pinCode: null,
      imageUrl: null,
    };

    // Update only the edited field with its new value
    if (editedField) {
      updatedData[editedField] = userDetails[editedField];
    }
    // Log the updated data to see what is being sent
    console.log("Updated Data Sent to API:", updatedData);
    try {
      const response = await UpdateStudentDetails(updatedData);
      console.log(response, "response");

      if (response.data.status) {
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  }
  const GetprofileDetails = async () => {
    try {
      const response = await GetUserDetails();
      if (response.data.status) {
        setUserDetails(response.data.data[0])
        setUser(response.data.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  }

  useEffect(() => {
    GetprofileDetails()
  }, [])

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
            {/* <img src={photo} width={40} height={40} style={{ marginRight: 10 }} /> */}
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
          <img className="rounded-circle p-1 border border-secondary" src={userDetails?.imageUrl || demo} alt="Student" width={150} height={150} />
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>SESSION</div>
          <div>{userDetails?.session}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>SCHOOL NAME</div>
          <div>{userDetails?.schoolCode}-{userDetails?.schoolName}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>STUDENT NAME</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditing['candidate_Name'] ? (
              <>
                <input
                  type="text"
                  value={userDetails.candidate_Name || ''}
                  onChange={(e) => handleInputChange('candidate_Name', e.target.value)}
                  style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                />
                <VscSaveAs
                  onClick={() => handleSaveClick('candidate_Name')}
                  style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                />
              </>
            ) : (
              <>
                <span>{userDetails.candidate_Name}</span>
                <CiEdit
                  style={{ color: 'red', cursor: 'pointer', fontSize: 'larger' }}
                  onClick={() => handleEditClick('candidate_Name')}
                />
              </>
            )}
          </div>
          {/* <FaRegEdit onClick={() => handleShow('candidate_Name', storedUser?.candidate_Name)} /> */}
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>CLASS</div>
          {/* <div>{userDetails?.classId}</div> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditing['classId'] ? (
              <>
                <input
                  type="text"
                  value={userDetails.classId}
                  onChange={(e) => handleInputChange('classId', e.target.value)}
                  style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                />
                <VscSaveAs
                  onClick={() => handleSaveClick('classId')}
                  style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                />
              </>
            ) : (
              <>
                <span>{userDetails.classId}</span>
                <CiEdit
                  style={{ color: 'red', cursor: 'pointer', fontSize: 'larger' }}
                  onClick={() => handleEditClick('classId')}
                />
              </>
            )}
          </div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>GENDER</div>
          {/* <div>{userDetails?.gender}</div> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditing['gender'] ? (
              <>
                <input
                  type="text"
                  value={userDetails.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                />
                <VscSaveAs
                  onClick={() => handleSaveClick('gender')}
                  style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                />
              </>
            ) : (
              <>
                <span>{userDetails.gender}</span>
                <CiEdit
                  style={{ color: 'red', cursor: 'pointer', fontSize: 'larger' }}
                  onClick={() => handleEditClick('gender')}
                />
              </>
            )}
          </div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>DATE OF BIRTH</div>
          <div> {userDetails?.dateOfBirth ? moment(userDetails.dateOfBirth).format('DD/MM/YYYY') : ""}</div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>FATHER NAME</div>
          {/* <div>{userDetails?.fatherName}</div> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditing['fatherName'] ? (
              <>
                <input
                  type="text"
                  value={userDetails.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                />
                <VscSaveAs
                  onClick={() => handleSaveClick('fatherName')}
                  style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                />
              </>
            ) : (
              <>
                <span>{userDetails.fatherName}</span>
                <CiEdit
                  style={{ color: 'red', cursor: 'pointer', fontSize: 'larger' }}
                  onClick={() => handleEditClick('fatherName')}
                />
              </>
            )}
          </div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>MOBILE NUMBER</div>
          {/* <div>{userDetails?.mobileNo}</div> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditing['mobileNo'] ? (
              <>
                <input
                  type="text"
                  value={userDetails.mobileNo}
                  onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                  style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                />
                <VscSaveAs
                  onClick={() => handleSaveClick('mobileNo')}
                  style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                />
              </>
            ) : (
              <>
                <span>{userDetails.mobileNo}</span>
                <CiEdit
                  style={{ color: 'red', cursor: 'pointer', fontSize: 'larger' }}
                  onClick={() => handleEditClick('mobileNo')}
                />
              </>
            )}
          </div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600 }}>EMAIL ID</div>
          {/* <div>{userDetails?.emailId}</div> */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isEditing['emailId'] ? (
              <>
                <input
                  type="text"
                  value={userDetails.emailId}
                  onChange={(e) => handleInputChange('emailId', e.target.value)}
                  style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                />
                <VscSaveAs
                  onClick={() => handleSaveClick('emailId')}
                  style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                />
              </>
            ) : (
              <>
                <span>{userDetails.emailId}</span>
                <CiEdit
                  style={{ color: 'red', cursor: 'pointer', fontSize: 'larger' }}
                  onClick={() => handleEditClick('emailId')}
                />
              </>
            )}
          </div>
        </div>
        <div className='profilecom'>
          <div style={{ fontWeight: 600}}>ENROLLMENT NUMBER</div>
          <div>{userDetails?.enrollmentNo}</div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
