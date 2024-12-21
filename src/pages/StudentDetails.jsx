import {
  AppBar,
  Box,

  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { toast } from "react-toastify";
import { GetClassList, GetUserDetails, UpdateStudentDetails } from "../common/getdata";
import moment from 'moment';

import { VscSaveAs } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";

import demo from "../assets/userimg.jpg";


function StudentDetails({ isOpen, setIsOpen, setUser, profileDetails, onSave }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // const urlSearchString = window. location.search; 
  // const params = new URLSearchParams(urlSearchString);
  // const tokenString = params.get("token")
  // if (tokenString) {
  //   localStorage.setItem('tokenGet', tokenString);
  // }
  const [classList, setClassList] = useState()
  const [userDetails, setUserDetails] = useState({});
  const [isEditing, setIsEditing] = useState(true);
  const [editedField, setEditedField] = useState(null);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    setEditedField(field);
  };

  const handleSaveClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
    UpdateStudentDetail()
    setTimeout(() => {
      GetprofileDetails();
    }, 1000);
  };

  // const handleInputChange = (field, value) => {
  //   setUserDetails((prev) => ({ ...prev, [field]: value }));
  // };
  const handleInputChange = (key, value) => {
    if (key === 'dateOfBirth') {
      // Ensure the value is converted to your desired format for storage
      setUserDetails((prev) => ({
        ...prev,
        [key]: moment(value, "YYYY-MM-DD"),
      }));
    } else {
      setUserDetails((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };


  const UpdateStudentDetail = async () => {
    const updatedData = {
      studentName: null,
      fatherName: null,
      motherName: null,
      gender: null,
      dateOfBirth: null,
      enrollmentNo: userDetails.enrollmentNo,
      mobileNo: null,
      emailId: null,
      classId: null,
      areaTypeID: null,
      stateID: null,
      districtID: null,
      cityID: null,
      pinCode: null,
      imageUrl: null
    };

    if (editedField) {
      updatedData[editedField] = userDetails[editedField];
    }
    try {
      const response = await UpdateStudentDetails(updatedData);
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

  const ClassList = async () => {
    try {
      const response = await GetClassList();
      if (response.data.status) {
        setClassList(response.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  }

  useEffect(() => {
    GetprofileDetails()
    ClassList()
  }, [])

  return (
    <div className="" style={{ marginBottom: "72px" }}>
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
          </Toolbar>
        </AppBar>
      </Box>
      <div className="offcanvas-bg" style={{ overflowY: 'auto', height: "calc(100vh - 136px)" }}>
        <div className="m-2 mt-4 " style={{ padding: '20px', border: '1px solid #9f9393' }}>
          <div className="d-flex justify-content-center mb-3" >
            <img className="rounded-circle p-1 border border-secondary" src={userDetails?.imageUrl || demo} alt="Student" width={150} height={150} />
          </div>
          <div className='profilecom'>
            <div style={{ fontWeight: 600 }}>SESSION</div>
            <div>{userDetails?.session}</div>
          </div>
          <div className='profilecom'>
            <div style={{ fontWeight: 600 }}>ENROLLMENT NO.</div>
            <div>{userDetails?.enrollmentNo}</div>
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
                  <TextField
                    // multiline
                    // rows={1}
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
                  <span style={{ overflowX: 'hidden', overflowY: 'auto', width: '166px', wordBreak: 'break-all', textAlign: 'right' }}>{userDetails.candidate_Name}</span>
                  <CiEdit
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
                    onClick={() => handleEditClick('candidate_Name')}
                  />
                </>
              )}
            </div>
            {/* <FaRegEdit onClick={() => handleShow('candidate_Name', storedUser?.candidate_Name)} /> */}
          </div>
          <div className="profilecom">
            <div style={{ fontWeight: 600 }}>CLASS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing['classId'] ? (
                <>
                  <select
                    value={userDetails.classId || ""}
                    onChange={(e) => handleInputChange('classId', e.target.value)}
                    style={{
                      padding: '4px',
                      fontSize: '14px',
                      border: 'none',
                      backgroundColor: 'rgb(218 226 234)',
                    }}
                  >
                    <option value="" disabled>
                      --Choose Class--
                    </option>
                    {classList.data.map((cls) => (
                      <option key={cls.classId} value={cls.classId}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                  <VscSaveAs
                    onClick={() => handleSaveClick('classId')}
                    style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                  />
                </>
              ) : (
                <>
                  <span>{userDetails.classId || '--Choose Class--'}</span>
                  <CiEdit
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
                    onClick={() => handleEditClick('classId')}
                  />
                </>
              )}
            </div>
          </div>
          <div className='profilecom'>
            <div style={{ fontWeight: 600 }}>GENDER</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing['gender'] ? (
                <>
                  <select
                    value={userDetails.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    style={{
                      padding: '4px',
                      fontSize: '14px',
                      border: 'none',
                      backgroundColor: "rgb(218 226 234)",
                      appearance: 'none'
                    }}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                  <VscSaveAs
                    onClick={() => handleSaveClick('gender')}
                    style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                  />
                </>
              ) : (
                <>
                  <span>{userDetails.gender}</span>
                  <CiEdit
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
                    onClick={() => handleEditClick('gender')}
                  />
                </>
              )}
            </div>
          </div>
          <div className='profilecom'>
            <div style={{ fontWeight: 600 }}>DATE OF BIRTH</div>
            {/* <div> {userDetails?.dateOfBirth ? moment(userDetails.dateOfBirth).format('DD/MM/YYYY') : ""}</div> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing['dateOfBirth'] ? (
                <>
                  <input
                    type="date"
                    value={userDetails?.dateOfBirth
                      ? moment(userDetails.dateOfBirth).format('YYYY-MM-DD') // Convert to valid format
                      : ""}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    style={{ padding: '4px', fontSize: '14px', border: 'none', backgroundColor: "rgb(218 226 234)" }}
                  />
                  <VscSaveAs
                    onClick={() => handleSaveClick('dateOfBirth')}
                    style={{ color: 'green', cursor: 'pointer', fontSize: 'larger' }}
                  />
                </>
              ) : (
                <>
                  <span> {userDetails?.dateOfBirth && moment(userDetails.dateOfBirth, "YYYY-MM-DD").isValid()
                    ? moment(userDetails.dateOfBirth, "YYYY-MM-DD").format('DD/MM/YYYY') // Display in readable format
                    : "Invalid Date"}</span>
                  <CiEdit
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
                    onClick={() => handleEditClick('dateOfBirth')}
                  />
                </>
              )}
            </div>
          </div>
          <div className='profilecom'>
            <div style={{ fontWeight: 600 }}>FATHER NAME</div>
            {/* <div>{userDetails?.fatherName}</div> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing['fatherName'] ? (
                <>
                  <TextField
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
                  <span style={{ overflowX: 'hidden', overflowY: 'auto', width: '166px', wordBreak: 'break-all', textAlign: 'right' }}>{userDetails.fatherName}</span>
                  <CiEdit
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
                    onClick={() => handleEditClick('fatherName')}
                  />
                </>
              )}
            </div>
          </div>
          <div className='profilecom'>
            <div style={{ fontWeight: 600 }}>MOBILE NO.</div>
            {/* <div>{userDetails?.mobileNo}</div> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditing['mobileNo'] ? (
                <>
                  <input
                    type="text"
                    value={userDetails.mobileNo}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        handleInputChange('mobileNo', value);
                      }
                    }}
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
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
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
                    style={{ cursor: 'pointer', fontSize: 'larger' }}
                    onClick={() => handleEditClick('emailId')}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
