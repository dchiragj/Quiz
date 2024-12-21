import React, { useEffect, useState } from 'react';
import { GetFeedBackFormDetails, SaveFeedBackFormDetails } from '../common/getdata';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Button, Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FeedBackForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [feedbackDetails, setFeedbackDetails] = useState([]); // Initialize as an array
  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected answers
  const quizNo = JSON.parse(localStorage.getItem("quizNo"))  || '' 
  const StudentClas = JSON.parse(localStorage.getItem("user")) || {}
  useEffect(() => {
    GetFeedBackForm();
  }, []);

  const GetFeedBackForm = async () => {
    try {
      const response = await GetFeedBackFormDetails();
      if (response.status && response.data) {
        setFeedbackDetails(response.data.data); // Access the array of questions
      } else {
        console.error("Failed to fetch feedback form data");
      }
    } catch (error) {
      console.error("error-->", error);
    }
  };
  // Handle option selection
  const handleOptionChange = (questionId, optionValue) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: optionValue
    }));
  };
  
  const handlesSubmit = async () => {
    const payload = Object.keys(selectedOptions).map(questionId => ({
      questionId: parseInt(questionId),
      optionValue: selectedOptions[questionId],
      quizNo:quizNo,
      // standard:StudentClas.class
    }));
    try {
      const response = await SaveFeedBackFormDetails(payload);
      if (response.data.status) {
        toast.success(response.data.message,{
          style:{
              backgroundColor: '#d1e7dd',
              color: '#0f5132'
          }
      });
        navigate('/details');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };
    // Check if all questions have been answered
    const allOptionsSelected = feedbackDetails.every(
      question => selectedOptions[question.id] !== undefined
    );

  return (
    <div style={{marginBottom:'80px'}}>
      <Box className="w-100">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              // onClick={saveAndExit}
            >
              <IoMdArrowRoundBack color="#000000"  />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feedback Form
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{overflowY:'auto',height: "calc(100vh - 136px)"}}>
      <div className='border border-primary rounded m-2' >
      {feedbackDetails.map((questionItem,index) => (
        <div key={questionItem.id} style={{  paddingLeft:"20px",paddingRight:"20px", paddingTop:'10px' }}>
          <h6>{index + 1}.{questionItem.questionText}</h6>
          {questionItem.option.map((opt) => (
            <div key={opt.qValue}>
              <label>
                <input
                  type="radio"
                  className="mr-2"
                  name={`question-${questionItem.id}`}
                  value={opt.qValue}
                  checked={selectedOptions[questionItem.id] === opt.qValue}
                  onChange={() => handleOptionChange(questionItem.id, opt.qValue)}
                />
                {opt.qOption}
              </label>
            </div>
          ))}
        </div>
      ))}
      </div>
       <Row className="m-3">
          <Col className="text-center">
            <Button
               variant="contained"
               fullWidth
               style={{ backgroundColor: "#1976d2",font:"bold", color:'#fff' }}
              onClick={handlesSubmit}
              disabled={!allOptionsSelected}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FeedBackForm;
