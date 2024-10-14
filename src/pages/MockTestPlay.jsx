import React, { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { GetQuizResult, SaveQuizAnswer } from "../common/getdata";

const MockTestPlay = () => {
  const navigate = useNavigate();
  const { mockTestData } = useContext(AuthContext);

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [result, setResult] = useState({});
  const [isResultModel, setIsResultModel] = useState(false);
  console.log("selectedAnswers", selectedAnswers);

  const handleOptionSelect = (id, optionKey) => {
    setSelectedAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === id
      );
      if (existingIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex].selectedAnswer = optionKey;
        return updatedAnswers;
      } else {
        return [
          ...prevAnswers,
          {
            questionId: id,
            selectedAnswer: optionKey,
          },
        ];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await SaveQuizAnswer(selectedAnswers);
      const response = await GetQuizResult();
      setIsResultModel(true);
      setResult(response.data);
    } catch (error) {
      console.log("error", error);
    }
    // navigate("/mocktestsecond");
  };
  const saveAndExit = () => {
    navigate("/studentlogin");
    localStorage.clear();
  };

  return (
    <div
      maxWidth="sm"
      sx={{
        backgroundColor: "",
        height: "100vh",
        color: "white",
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="w-100">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/mocktest")} // Move onClick handler here
            >
              <IoMdArrowRoundBack color="#000000" />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mock Test Play
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", paddingBottom: 2 }}>
        {mockTestData?.data?.map((mock, index) => (
          <Box
            key={index}
            sx={{
              color: "#000000",
              padding: 2,
              borderRadius: 2,
              marginBottom: 3,
            }}
          >
            <Box variant="body1" sx={{ textAlign: "left", marginBottom: 3 }}>
              {(() => {
                const imgMatch = mock.qText.match(/\(#(\d+)img\)/);
                const imgSrc = imgMatch
                  ? require(`../assets/imgs/${imgMatch[1]}img.png`)
                  : null;
                const splitedData = mock.qText.split(/\s*\(#\d+img\)\s*/);
                return (
                  <>
                    {index + 1}.{splitedData[0]}
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
                );
              })()}
            </Box>

            <Grid container spacing={2}>
              {Object.entries(mock.options).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      color:
                        selectedAnswers.find(
                          (answer) => answer.questionId === mock.questionId
                        )?.selectedAnswer === key
                          ? "white"
                          : "black",
                      borderColor: "#1A73E8",

                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        selectedAnswers.find(
                          (answer) => answer.questionId === mock.questionId
                        )?.selectedAnswer === key
                          ? "#1A73E8"
                          : "transparent",
                      "&:hover": {
                        backgroundColor:
                          selectedAnswers.find(
                            (answer) => answer.questionId === mock.questionId
                          )?.selectedAnswer === key
                            ? "#1A73E8"
                            : "#1A73E8",
                        color: "white",
                      },
                      ":active": {
                        backgroundColor: "#1A73E8",
                        color: "white",
                      },
                    }}
                    onClick={() => handleOptionSelect(mock.questionId, key)}
                  >
                    {value.includes("#") ? (
                      <img
                        src={require(`../assets/imgs/${value.replace(
                          "#",
                          ""
                        )}.png`)}
                        alt={value}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      value
                    )}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
      <div className="my-4 d-flex justify-content-center">
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswers.length < mockTestData?.data?.length}
          variant="contained"
        >
          Submit
        </Button>
      </div>
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
          }}
        />
      )}
      <div
        className={`modal fade ${isResultModel && "show"} `}
        style={{ display: isResultModel ? "block" : "none", zIndex: 1050 }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden={!isResultModel}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-black"
                id="exampleModalCenterTitle"
              >
                Quiz Result
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setIsResultModel(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="text-black p-3">
              <p>Total : {result?.data?.totalQuestion}</p>
              <p>Correct : {result?.data?.correctQuestion}</p>
              <h3>Percentage : {result?.data?.percentage}</h3>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsResultModel(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveAndExit}
              >
                Save&Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestPlay;
