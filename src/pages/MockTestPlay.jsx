import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Paper, AppBar, Toolbar, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { GetQuestionDetailsById, GetQuizResult, QuizQuestionsList, SaveQuizAnswer } from "../common/getdata";
import { div } from "@tensorflow/tfjs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import { FcClock } from "react-icons/fc";
import { toast } from "react-toastify";
import { TbRefresh } from "react-icons/tb";
import Chatimg from '../assets/test.jpg'
import { queries } from "@testing-library/react";

const MockTestPlay = () => {
  const navigate = useNavigate();
  const optionLabels = ['A', 'B', 'C', 'D'];
  const { mockTestData } = useContext(AuthContext);
  const [question, setQuestion] = useState(mockTestData);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState({});
  const [isResultModel, setIsResultModel] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // const [refreshedQuestion, setRefreshedQuestion] = useState(null);
  const [test, settest] = useState();
  const chatEndRef = useRef(null);
  const location = useLocation();
  const Directfile = location.state?.studentData.createdBy
  const studentData = location.state?.studentData.quizNo;
  const parseTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return (seconds || 0) + (hours * 3600) + (minutes * 60);
  };
  const Time = location.state?.studentData.examTime;
  const [timeLeft, setTimeLeft] = useState(parseTimeToSeconds(Time));
  const [timerId, setTimerId] = useState(null);
  // const StudentClas = JSON.parse(localStorage.getItem("user")) || {}
  const Quiz = {
    QuizNo: studentData
  }
  const sound = new Audio("/click-sound.mp3");


  useEffect(() => {
    // Scroll to the latest message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleSubmit(); // Pass true to indicate auto-submit
          toast.error("Time is up! Your test has been submitted.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimerId(timerId); // Store the timer ID
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };


  const handleNextQuestion = (answerObj) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "bot", content: `${currentQuestionIndex + 1}. ${question.data[currentQuestionIndex]?.qText}`, time: getCurrentTime() },
      { type: "user", content: answerObj.answerVal, time: getCurrentTime() },
    ]);

    if (currentQuestionIndex < question.data.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // setRefreshedQuestion(null);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", content: 'Submit' },
      ]);
    }
  };

  const handleSubmit = async () => {
    if (timerId) {
      clearInterval(timerId);
    }
    try {
      const answers = selectedAnswers.map((x) => ({
        questionId: x.questionId,
        selectedAnswer: x.selectedAnswer?.answerKey,
        quizNo: studentData,
        timeLeft: formatTime(timeLeft)
      }));    
      const saveResponse = await SaveQuizAnswer(answers);
      if (saveResponse?.data?.data.quizNo && saveResponse?.data?.data.attemptId) {
        const Quiz = {
          QuizNo: saveResponse.data.data.quizNo,
          AttemptId: saveResponse.data.data.attemptId,
        };
        const resultResponse = await GetQuizResult(Quiz);
        // Update state with the result
        setIsResultModel(true);
        setResult(resultResponse.data);
      } else {
        console.error("SaveQuizAnswer response missing quizNo or attemptId.");
      }
    } catch (error) {
      console.error("Error during quiz submission:", error);
    }
  };

  const onAnswerSelect = (questionId, answerKey, answerVal) => {
    sound.play();
    setSelectedAnswers((prev) => [
      ...prev,
      { questionId, selectedAnswer: { answerKey, answerVal } },
    ]);
    handleNextQuestion({ answerKey, answerVal });
  };
  const saveAndExit = () => {
    navigate("/mocktest")
  }
  const handleRefreshQuestion = async (questionId) => {
    try {
      const response = await GetQuestionDetailsById({ questionId });
      if (response.data.status) {
        toast.success("Question refreshed successfully..!!");
        // Update the specific question in the state
        setQuestion(prev => ({
          ...prev,
          data: prev.data.map(q =>
            q.questionId === questionId ? response.data.data : q // Replace the old question with the new one
          )
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };

  const createdBy = (text, type) => {
    if (Directfile === 'Direct') {
      if (type === 'bot') {
        return (
          <div className="direct-bot-content"
            dangerouslySetInnerHTML={{
              __html: text, // Directly inject the HTML content
            }}
          />
        );
      } else if (type === 'user') {
        // If you need to do any processing on the options (like extracting images from the text)
        return (
          <div className="direct-user-content"
            dangerouslySetInnerHTML={{
              __html: text, // Same for user responses
            }}
          />
        );
      }
    } else {
      const imgMatch = text.match(/\(#(\d+)img\)/);
      const imgSrc = imgMatch
        ? require(`../assets/imgs/${imgMatch[1]}img.png`)
        : null;
      const splitedData =
        text.split(/\s*\(#\d+img\)\s*/);
      if (type === 'bot') {
        return (
          <>
            {splitedData[0]}
            {imgSrc && (
              <Box
                sx={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imgSrc}
                  alt={`${imgMatch[1]}img`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    height: "auto",
                  }}
                />
              </Box>
            )}
            {splitedData[1]}
          </>
        )
      } else if (type === 'user') {
        return (
          <>
            {text.includes("#") ? (
              <img
                src={require(`../assets/imgs/${text.replace(
                  "#",
                  ""
                )}.png`)}
                alt={text}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            ) : (
              text
            )}
          </>
        )
      }
    }
  }
  useEffect(() => {
  }, [])
  return (
    // style={{ backgroundImage: `url(${Chatimg})`,}}
    <div className="backgroundImage">
      <Box className="w-100">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={saveAndExit}
            >
              <IoMdArrowRoundBack color="#000000" />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mock Test Play
            </Typography>
            <div style={{ color: 'black' }}>
              <div className="text-end d-flex justify-content-end align-items-center mr-2">Mock Test Time</div>
              <div className="text-end d-flex justify-content-end align-items-center mr-2" >
                <h3 className="mr-2"><FcClock /> </h3>
                <h3 >{formatTime(timeLeft)}</h3>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Box  >
        <div className="text-end d-flex justify-content-end align-items-center">Mock Test Time</div>
        <div className="text-end d-flex justify-content-end align-items-center" style={{
          position: 'fixed',
          top: '1px', // adjust as needed
          right: '1px', // adjust as needed
          backgroundColor: 'white', // optional: add background for better visibility
          padding: '8px',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // optional: adds subtle shadow
          zIndex: 1000
        }}>
          <h3 className="mr-2" style={{ color: 'red' }}><FcClock /> </h3>
          <h3 style={{ color: 'red' }}>{formatTime(timeLeft)}</h3>
        </div>
      </Box> */}
      <Box
        sx={{
          // height: "100vh",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFEFD5",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            // margin: "16px 0",
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto", // centers horizontally
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            सभी सवालों के चार विकल्प हैं | सही उत्तर को इंगित करने के लिए एक बॉक्स का चयन करें |
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ color: "black", fontWeight: "bold", mt: 1 }}
          >
            All questions are followed by four options. Select one box to indicate the correct answer.
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,

          }}
        >
          {chatHistory.map((msg, index) => (
            <Paper
              key={index}
              sx={{
                padding: 2,
                backgroundColor: msg.type === "bot" ? "#e0f7fa" : "#c8e6c9",
                alignSelf: msg.type === "bot" ? "flex-start" : "flex-end",
                fontSize: msg.type == "bot" ? "20px" : '',
                maxWidth: "auto",
              }}
            >
              <Typography variant="body1">{createdBy(msg.content, msg.type)}</Typography>
              <Typography variant="caption" sx={{ display: "block", textAlign: "right" }}>
                {msg.time}
              </Typography>
            </Paper>
          ))}
          <div ref={chatEndRef} />
          {question?.data?.length > currentQuestionIndex && (
            <Box sx={{ marginBottom: 3}}>
              <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1, flexWrap: 'wrap' ,bgcolor:'#E5E4E2', borderRadius:2 ,padding:1}}>
                {createdBy(`${currentQuestionIndex + 1}. ${question.data[currentQuestionIndex]?.qText}`, "bot")}
                <div 
                  // variant="outlined"
                  color="primary"
                  onClick={() => handleRefreshQuestion(question.data[currentQuestionIndex]?.questionId)}
                  sx={{ px: 1 }}
                >
                  <TbRefresh fontSize={20} color="#0d6efd" />
                </div>
              </Typography>
              {question.data[currentQuestionIndex]?.options && Object.entries(question.data[currentQuestionIndex]?.options).map(([key, value], idx) => (
                // {question.data[currentQuestionIndex]?.options?.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() =>
                    onAnswerSelect(
                      question.data[currentQuestionIndex]?.questionId,
                      key,
                      value
                    )
                  }
                  sx={{
                    display: "flex",
                    border: "1px solid #0d6efd",
                    justifyContent: 'flex-start',
                    alignItems: "center",
                    marginTop: 1,
                    textAlign: "left",
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                  }}
                >
                  {`${optionLabels[idx]}). `}{createdBy(value, 'user')}
                </Button>
              ))}
            </Box>
          )}

          {question?.data?.length === currentQuestionIndex && (
            <Button
              variant="contained"
              color="primary" onClick={handleSubmit}>Submit</Button>
          )}
        </Box>

        {isResultModel && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, width: '85%' }}>
              <Typography variant="h6" gutterBottom className="border-bottom">
                Your Assessment Summary
              </Typography>

              <div className="d-flex justify-content-start align-items-center">
                <div style={{ color: "#1976d2" }}>Total:</div>
                <div>{result?.data?.totalQuestion}</div>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <div style={{ color: "#1976d2" }}>Correct:</div>
                <div>{result?.data?.correctQuestion}</div>
              </div>
              <div className="d-flex justify-content-start align-items-center border-bottom">
                <div style={{ color: "#1976d2" }}>Percentage:</div>
                <div>{result?.data?.percentage}</div>
              </div>
              {/* <Typography >Total: {result?.data?.totalQuestion}</Typography>
            <Typography>Correct: {result?.data?.correctQuestion}</Typography>
            <Typography className="border-bottom">Percentage: {result?.data?.percentage}</Typography> */}
              <Row className="text-start border-bottom">
                <Col>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheck}
                        color="primary"
                      />
                    }
                    label="Click on the Checkbox Before Submitting your Answer"
                  />
                </Col>
              </Row>
              <Button
                onClick={() => {
                  setIsResultModel(false);
                  // navigate("/mocktest");
                }}
                variant="outlined"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsResultModel(false);
                  navigate("/feedback");
                }}
                disabled={!isChecked}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save & Exit
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MockTestPlay;
