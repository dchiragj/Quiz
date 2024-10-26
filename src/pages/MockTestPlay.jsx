import React, { useContext, useState } from "react";
import { Box, Button, Typography, Paper, AppBar, Toolbar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { GetQuizResult, SaveQuizAnswer } from "../common/getdata";
import { div } from "@tensorflow/tfjs";
import { IoMdArrowRoundBack } from "react-icons/io";

const MockTestPlay = () => {
  const navigate = useNavigate();
  const { mockTestData } = useContext(AuthContext);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState({});
  const [isResultModel, setIsResultModel] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);

  const handleNextQuestion = (answerObj) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "bot", content: `${currentQuestionIndex + 1}. ${mockTestData.data[currentQuestionIndex]?.qText}` },
      { type: "user", content: answerObj.answerVal },
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
      }));
      await SaveQuizAnswer(answers);
      const response = await GetQuizResult();
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
  const saveAndExit = () =>{
    navigate("/mocktest")
  }
  
  // Function to parse the question text and embed images
  const renderQuestionWithImages = (text, type) => {

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
              maxWidth: "80%",
            }}
          >
            <Typography variant="body1">{renderQuestionWithImages(msg.content, msg.type)}</Typography>
          </Paper>
        ))}
        {mockTestData?.data?.length > currentQuestionIndex && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="body1">
            {renderQuestionWithImages(`${currentQuestionIndex + 1}. ${mockTestData.data[currentQuestionIndex]?.qText}`, "bot")}
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
                  display: "block",
                  marginTop: 1,
                  textAlign: "left",
                  backgroundColor: "#f5f5f5",
                  width: "100%",
                }}
              >
                {renderQuestionWithImages(value, 'user')}
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
          <Box sx={{ backgroundColor: "white", padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quiz Result
            </Typography>
            <Typography>Total: {result?.data?.totalQuestion}</Typography>
            <Typography>Correct: {result?.data?.correctQuestion}</Typography>
            <Typography>Percentage: {result?.data?.percentage}</Typography>
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
                navigate("/mocktest");
              }}
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
