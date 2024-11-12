import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Paper, AppBar, Toolbar, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { GetQuizResult, SaveQuizAnswer } from "../common/getdata";
import { div } from "@tensorflow/tfjs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Col, Row } from "react-bootstrap";
import { FcClock } from "react-icons/fc";
import { toast } from "react-toastify";
import Chatimg from '../assets/test.jpg'

const MockTestPlay = () => {
  const navigate = useNavigate();
  const optionLabels = ['A', 'B', 'C', 'D'];
  const { mockTestData } = useContext(AuthContext);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState({});
  const [isResultModel, setIsResultModel] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
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
  const StudentClas = JSON.parse(localStorage.getItem("user")).userData || {}
  const Quiz = {
    QuizNo: studentData
  }


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
      { type: "bot", content: `${currentQuestionIndex + 1}. ${mockTestData.data[currentQuestionIndex]?.qText}`, time: getCurrentTime() },
      { type: "user", content: answerObj.answerVal, time: getCurrentTime() },
    ]);

    if (currentQuestionIndex < mockTestData.data.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", content: 'Submit' },
      ]);
    }
  };

  const handleSubmit = async () => {
    try {
      const answers = selectedAnswers.map((x) => ({
        questionId: x.questionId,
        selectedAnswer: x.selectedAnswer?.answerKey,
        quizNo: studentData,
        classNo: StudentClas.class
      }));
      await SaveQuizAnswer(answers);
      const response = await GetQuizResult(Quiz);
      setIsResultModel(true);
      setResult(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onAnswerSelect = (questionId, answerKey, answerVal) => {
    setSelectedAnswers((prev) => [
      ...prev,
      { questionId, selectedAnswer: { answerKey, answerVal } },
    ]);
    handleNextQuestion({ answerKey, answerVal });
  };
  const saveAndExit = () => {
    navigate("/mocktest")
  }

  // Function to parse the question text and embed images
  //  const renderQuestionWithImages = (text, type) => {
  //   const imgMatch = text.match(/\(#(\d+)img\)/);
  //   const imgSrc = imgMatch
  //     ? require(`../assets/imgs/${imgMatch[1]}img.png`)
  //     : null;
  //   const splitedData =
  //     text.split(/\s*\(#\d+img\)\s*/);
  //   if (type === 'bot') {
  //     return (
  //       <>
  //         {splitedData[0]}
  //         {imgSrc && (
  //           <Box
  //             sx={{
  //               margin: "10px 0",
  //               display: "flex",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <img
  //               src={imgSrc}
  //               alt={`${imgMatch[1]}img`}
  //               style={{
  //                 maxWidth: "100%",
  //                 maxHeight: "200px",
  //                 height: "auto",
  //               }}
  //             />
  //           </Box>
  //         )}
  //         {splitedData[1]}
  //       </>
  //     )
  //   } else if (type === 'user') {
  //     return (
  //       <>
  //         {text.includes("#") ? (
  //           <img
  //             src={require(`../assets/imgs/${text.replace(
  //               "#",
  //               ""
  //             )}.png`)}
  //             alt={text}
  //             style={{
  //               width: "100px",
  //               height: "100px",
  //               objectFit: "contain",
  //             }}
  //           />
  //         ) : (
  //           text
  //         )}
  //       </>
  //     )
  //   }

  // };

  // const Direct = (text, type) => {
  //   if (type === 'bot') {
  //     return (
  //       <div style={{ }}
  //         dangerouslySetInnerHTML={{
  //           __html: text, // Directly inject the HTML content
  //         }}
  //       />
  //     );
  //   } else if (type === 'user') {
  //     // If you need to do any processing on the options (like extracting images from the text)
  //     return (
  //       <div style={{width: "100px",
  //         height: "100px",
  //         objectFit: "contain",}}
  //         dangerouslySetInnerHTML={{
  //           __html: text, // Same for user responses
  //         }}
  //       />
  //     );
  //   }
  // }

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
          </Toolbar>
        </AppBar>
      </Box>
      <Box  >
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
      </Box>
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
                fontSize :msg.type == "bot" ? "20px" : '',
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
          {mockTestData?.data?.length > currentQuestionIndex && (
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="body1">
                {createdBy(`${currentQuestionIndex + 1}. ${mockTestData.data[currentQuestionIndex]?.qText}`, "bot")}
              </Typography>
              {Object.entries(mockTestData.data[currentQuestionIndex]?.options).map(([key, value], idx) => (
                // {mockTestData.data[currentQuestionIndex]?.options?.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() =>
                    onAnswerSelect(
                      mockTestData.data[currentQuestionIndex].questionId,
                      key,
                      value
                    )
                  }
                  sx={{
                    display: "flex",
                    justifyContent:'flex-start',
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

          {mockTestData?.data?.length === currentQuestionIndex && (
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
