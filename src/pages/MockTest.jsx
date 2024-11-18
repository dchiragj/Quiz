import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { TbMathSymbols } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import SearchAppBar from "../components/Appbar";
import { GetQuizResult, GetTotalQuizzAttemptList, QuizQuestionsList } from "../common/getdata";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";
import icons from '../assets/testicons.png'
import "react-toastify/dist/ReactToastify.css";
import Tabs from "../components/Tabs";
import TabsCom from "../components/Tabs";
import { HiDotsVertical } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { blue, deepPurple } from "@mui/material/colors";
import moment from "moment";


const MockTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setMockTestData } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [isResultModel, setisResultModel] = useState('');

  const [attempts, setAttempts] = useState([])
  const handleClickOpen = (quizNo, attemptId) => {
    handleQuizResult(quizNo, attemptId)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const parameters = {
    Flag: 'Created',
  };
  const handleMockTestPlayButton = async () => {
    try {
      const response = await QuizQuestionsList(parameters);
      setMockTestData(response.data);
      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.setItem("quizNo", JSON.stringify(response.data.examdetails.quizNo))
        navigate("/mocktestplay", {
          state: { studentData: response.data.examdetails },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };
  const fetchData = async () => {
    const response = await QuizQuestionsList(parameters);
    handleAttemptList(response.data.examdetails.quizNo)
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAttemptList = async (quizNo) => {
    try {
      const response = await GetTotalQuizzAttemptList(quizNo);
      if (response.data.status) {
        setAttempts(response.data.data)
        // toast.success(response.data.message);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };

  const handleQuizResult = async (quizNo, attemptId) => {
    const Quiz = {
      QuizNo: quizNo,
      AttemptId: attemptId,
    };
    try {
      const response = await GetQuizResult(Quiz);
      if (response.data.status) {
        setisResultModel(response.data.data)
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error-->", error);
    }
  };
  return (
    <>
      <SearchAppBar />
      <Card sx={{ margin: 2, color: "#fff" }}>
        <CardContent>
          <div className="w-100 d-flex justify-content-start align-items-center">
            <div variant="h2">
              <img src={icons} width={"40px"} />
              {/* <TbMathSymbols color="#000000" fo ntSize={"40px"} /> */}
            </div>
            <div className="w-100 d-flex flex-column justify-content-between ml-4 gy-5">
              <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h6" color="#000000">
                  Practice Test for KAMP -NASTA 2024
                </Typography>
                {/* <span style={{ color: "black" }}>12:00</span> */}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Typography variant="body2" color="#000000">
                  What would you like to do next?
                </Typography>
                {/* <button
                  className="border-0 rounded-circle d-flex justify-content-center align-items-center p-2"
                  onClick={handleMockTestPlayButton}
                >
                  <FaPlay />
                </button> */}
              </div>
            </div>
          </div>
          <Divider sx={{ marginY: 2 }} />
          <List>
            <ListItem
              // button
              sx={{ backgroundColor: "#333", borderRadius: "4px" }}
            >
              <ListItemText
                onClick={handleMockTestPlayButton}
                primary="Start Mock Test"
                sx={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      {
        attempts?.map((value, index) => {
          return (
            <Card key={index} className="m-3 border rounded p-1">
              <div className="d-flex align-items-center justify-content-between">
                {/* Left Section: Avatar (Centered Vertically) */}
                <div className="text-center">
                  <Avatar sx={{ bgcolor: blue[700] }} className="m-1">
                    MT
                  </Avatar>
                </div>
                {/* Middle Section: Details */}
                <div className="flex-grow-1 mx-3">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-1">Mock Test</h6>
                    <p className="mb-0" style={{ fontSize: "11px" }}>
                      {value?.examDate ? moment(value.examDate).format("DD/MM/YYYY") : ""}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Typography variant="body2" color="#4A4AFF">
                      Attempt {index + 1}
                    </Typography>
                    <p className="mb-0" style={{ fontSize: "11px" }}>
                      {value?.totalExamTime}
                    </p>
                  </div>
                </div>
                {/* Right Section: Action Icon */}
                <div className="text-center">
                  <HiDotsVertical
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => handleClickOpen(value.quizNo, value.attemptId)}
                  />
                </div>
              </div>
            </Card>


          )
        })
      }
      <div>
        <TabsCom />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="border-bottom">
          {"Attempt Summary"}
        </DialogTitle>
        <DialogContent>
          <div className="d-flex justify-content-start align-items-center ">
            <div style={{ color: "#1976d2" }}>Total: </div>
            <div>{isResultModel.answeredQuestion}</div>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <div style={{ color: "#1976d2" }}>Correct: </div>
            <div>{isResultModel.totalQuestion}</div>
          </div>
          <div className="d-flex justify-content-start align-items-center ">
            <div style={{ color: "#1976d2" }}>Percentage: </div>
            <div>{isResultModel.percentage}</div>
          </div>
        </DialogContent>
        <div className="text-center border-top mb-2">
          <Button variant="contained" className="mt-2"
            color="primary" onClick={handleClose}>close</Button>
        </div>
      </Dialog>

    </>
  );
};

export default MockTest;
