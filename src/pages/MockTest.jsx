import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { TbMathSymbols } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "../components/Appbar";
import { QuizQuestionsList } from "../common/getdata";
import { AuthContext } from "./context/AuthContext";

const MockTest = () => {
  const navigate = useNavigate();
  const { setMockTestData } = useContext(AuthContext);

  const handleMockTestPlayButton = async () => {
    try {
      const response = await QuizQuestionsList();
      setMockTestData(response.data);
      if (response.data.status) {
        navigate("/mocktestplay");
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
              <TbMathSymbols color="#000000" fontSize={"40px"} />
            </div>
            <div className="w-100 d-flex flex-column justify-content-between ml-4 gy-5">
              <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h6" color="#000000">
                  Maths Practice
                </Typography>
                <span style={{ color: "black" }}>12:00</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Typography variant="body2" color="#000000">
                  What would you like to do next?
                </Typography>
                <button
                  className="border-0 rounded-circle d-flex justify-content-center align-items-center p-2"
                  onClick={handleMockTestPlayButton}
                >
                  <FaPlay />
                </button>
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
                primary="Mock Test"
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
    </>
  );
};

export default MockTest;
