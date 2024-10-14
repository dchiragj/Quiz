import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ExamInstructions() {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
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
              onClick={() => navigate("/studentdetails")}
            >
              <ArrowBackIcon fontSize="large" style={{ color: "#000000" }} />
            </IconButton>
            <Typography sx={{ color: "#FFFFFF" }}>
              General Instructions
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="m-2 border border-primary rounded">
        <Row>
          <Col>
            <div className="border rounded p-4">
              <h4>General Instructions</h4>
              <ul>
                <li>
                  Total duration of 120 minutes will be given to attempt all the
                  questions.
                </li>
                <li>
                  The clock has been set at the server on the start of the test
                  and the countdown timer at the top right corner of your screen
                  will display the time remaining for you to complete the
                  examination.
                </li>
                <li>
                  To select a question to answer, click on Save and Next to save
                  the current question and go to the next question in sequence.
                </li>
                <li>
                  Save & Previous tab allows navigation between questions.
                </li>
                <li>
                  The "Final Submit" button allows submission of the Assessment.
                </li>
                <li>
                  Use "Mark for Review" for questions to be reviewed later.
                </li>
                <li>
                  Color-coded status:
                  <div
                    className="my-2 p-2 border rounded"
                    style={{
                      backgroundColor: "green",
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    Green: No.of answered questions
                  </div>
                  <div
                    className=" p-2 border rounded"
                    style={{
                      backgroundColor: "orange",
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    Orange: No. of questions marked for review
                  </div>
                  <div
                    className="my-2 p-2 border rounded"
                    style={{
                      backgroundColor: "grey",
                      color: "black",
                      textAlign: "left",
                    }}
                  >
                    Grey: Not attempted questions
                  </div>
                </li>
                <li>Ensure that the camera is on during the examination.</li>
                <li>Give required permissions for camera and microphone.</li>
                <li>
                  Login is for single use only and will be deactivated
                  automatically after submission or when time is over.
                </li>
                <li>
                  All questions are compulsory, and there is no negative marking
                  for incorrect answers.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="m-4">
          <Col>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheck}
                  color="primary"
                />
              }
              label="I have read all the instructions carefully and understood the rule of examination. My computer hardware is in proper working condition. I am ready to start the test."
            />
          </Col>
        </Row>
        <Row className="m-3">
          <Col className="text-center">
            <Button
              variant="contained"
              disabled={!isChecked}
              size="lg"
              //   block
              fullWidth
              onClick={() => navigate("/mocktest")}
            >
              START EXAM
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ExamInstructions;
