import React, { useRef, useState, useEffect } from 'react';
import { Button, Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import Webcam from 'react-webcam';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap
import { useLocation, useNavigate } from 'react-router-dom';
import { UploadUserImage } from '../common/getdata';
import { toast } from 'react-toastify';

const FaceCapture = () => {
  const location = useLocation();
  const studentData = location.state?.studentData;
  const [imageSrc, setImageSrc] = useState(null); // For storing the captured image
  const [hasPermission, setHasPermission] = useState(false); // Track camera permissions
  const [facingMode, setFacingMode] = useState('user'); // Track the camera facing mode
  const webcamRef = useRef(null); // Ref for the webcam component
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  console.log("studentData", studentData);


  // Request camera permissions when the component loads
  useEffect(() => {
    async function requestPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop()); // Stop stream after checking
      } catch (err) {
        console.error("Camera permissions denied:", err);
        setHasPermission(false);
      }
    }
    requestPermission();
  }, []);

  // Function to capture the image
  const capture = () => {
    const image = webcamRef.current.getScreenshot(); // Captures screenshot from the webcam
    setImageSrc(image); // Sets the captured image
  };

  // Function to toggle between front and back camera 
  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };
  const handleSubmit = async () => {
    const submissionData = {
      UserId: studentData.userId, 
      Image: imageSrc, 
      Flag: 1, 
    };
    try {
      const response = await UploadUserImage(submissionData);
      localStorage.setItem("user", JSON.stringify(response.data.data));
alert(JSON.stringify(response))
      if (response.data.status) {
        alert(JSON.stringify(response.data))
        // navigate("/idcard");
        setImageSrc(null);
        toast.success(response.data.message);
      } else {
        setImageSrc(null);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
    // alert(submissionData)
  }

  return (
    <>
      <Box className="w-100">
        <AppBar position="center">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            // onClick={() => navigate("/studentlogin")} // Move onClick handler here
            >
              <ArrowBackIcon style={{ color: "#000000" }} fontSize="large" />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Capture Your Face
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='d-flex flex-column align-items-center justify-content-center px-3' style={{ height: "calc(100vh - 59px)" }}>
        <Box className="text-center">

          {/* If camera permission granted, show webcam or else display a message */}
          {hasPermission ? (
            <div className="webcam-wrapper" style={{  borderRadius: '10px' ,border:"1px solid black" }}>
              {!imageSrc ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode }} // Use the facingMode state
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: '10px',
                  }}
                />
              ) : (
                <img
                  src={imageSrc}
                  alt="Captured"
                  style={{ borderRadius: '10px', width: '320px', height: '320px', border: '5px solid white' }}
                />
              )}

              {/* Face Outline Overlay (optional styling) */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                border: '5px solid transparent',
                // boxShadow: '0 0 0 5px white inset'
              }}></div>
            </div>
          ) : (
            <Typography variant="h6" color="error">Camera permission not granted!</Typography>
          )}

          {/* Capture or Retake Button */}
          {hasPermission && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => (imageSrc ? setImageSrc(null) : capture())} // Toggle between capture and retake
                className="mt-3"
              >
                {imageSrc ? 'Retake' : 'Capture Your Face'}
              </Button>
              {/* Toggle Camera Button */}
              {!imageSrc &&
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={toggleCamera} // Call toggleCamera function
                  className="mt-3 ms-2"
                >
                  Switch Camera
                </Button>}
            </>
          )}
          {/* Submit Button - shown when retake photo comes */}
          {imageSrc && !isSubmitted && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                className="mt-3 ms-2"
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </div>
    </>
  );
};

export default FaceCapture;
