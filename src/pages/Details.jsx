import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { AppBar, Avatar, CardActions, Toolbar } from "@mui/material";
import kamlogo from "../assets/kamplogo.png"
import { Carousel, Toast } from "react-bootstrap";
import { FaFileCircleCheck } from "react-icons/fa6";
import { blue, brown, deepOrange, green, orange, purple, red, yellow } from "@mui/material/colors";
import { BsBoxes, BsClipboard2CheckFill } from "react-icons/bs";
import { IoInvertMode, IoNewspaper } from "react-icons/io5";
import { MdOutlineAirplanemodeActive, MdOutlineIntegrationInstructions, MdSubject } from "react-icons/md";
import { FaRobot, FaSearch } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { CiFaceSmile } from "react-icons/ci";
import { PiFilesBold, PiSmileySadBold } from "react-icons/pi";
import { CgSmileNone } from "react-icons/cg";
import { FiCheckSquare } from "react-icons/fi";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png"
import { IoMdMenu } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { GetTotalQuizzAttemptList, GetUserDetails, PdfURL, QuizQuestionsList } from "../common/getdata";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const Details = ({ isOpen, setIsOpen, setUser }) => {
    const { setMockTestData } = useContext(AuthContext);
    const [isPracticeTestVisible, setIsPracticeTestVisible] = useState(true); // State to manage visibility
    const [attempts, setAttempts] = useState([]);

    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const tokenString = params.get("token")
    if (tokenString) {
        localStorage.setItem('tokenGet', tokenString);
    }
    const navigate = useNavigate();
    const handlePracticeTestClick = () => {
        setIsPracticeTestVisible(!isPracticeTestVisible); // Toggle visibility
    };
    const handleRedirect = () => {
        window.location.href = 'https://kamp.org.in/lesform';
    }
    const attemptsdata = attempts.map((item, index) => ({
        attempt: `Attempt ${index + 1}`,
        total: item.totalQuestion,
        correct: item.correctQuestion,
        percentage: item.percentage,
    }));
    // Group attempts into chunks of 3
    const chunkAttempts = (arr, size) => {
        const grouped = [];
        for (let i = 0; i < arr.length; i += size) {
            grouped.push(arr.slice(i, i + size));
        }
        return grouped;
    };

    const groupedAttempts = chunkAttempts(attemptsdata, 2);
    const graphData = {
        labels: attemptsdata.map((item) => item.attempt),
        datasets: [
            {
                label: "Percentage (%)",
                data: attemptsdata.map((item) => parseFloat(item.percentage)),
                fill: false,
                borderColor: "#A52A2A",
                tension: 0.3,
            },
        ],
    };

    const handleMockTestPlayButton = async () => {
        const parameters = {
            Flag: 'Created',
        };
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

    const handleAttemptList = async () => {
        try {
            const response = await GetTotalQuizzAttemptList();
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
    const GetprofileDetails = async () => {
        try {
            const response = await GetUserDetails();
            if (response.data.status) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                setUser(response.data.data)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error-->", error);
        }
    }
    const GetPdfURL = async (flag) => {
        try {
            const response = await PdfURL(flag);
            if (response.data.data._PdfURL) {
                window.open(response.data.data._PdfURL, "_blank");
            }else {
                toast.error("PDF not available for this class.");
            }
        } catch (error) {
            console.log("error-->", error);
        }
    }
    useEffect(() => {
        handleAttemptList()
        GetprofileDetails()
    }, [])
    return (

        <div style={{ marginBottom: '80px' }}>
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 12, textAlign: "center" }}>
                            KNOWLEDGE AND AWARENESS MAPPING PLATFORM (KAMP)
                        </Typography>
                        <div className=" ">
                            <img src={"https://kamp.org.in/Images/logo-white.webp"} alt="" style={{ width: 60, height: 60, }} />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{ backgroundColor: "#f3f0f6" }}>

                {/* Welcome Text */}
                <div className="m-2 font-weight-bold">
                    Hi AAYUSHMAN DWIVEDI
                </div>

                {/* Search Bar */}
                <Box sx={{ margin: 2, position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            width: '100%',
                            padding: '10px 40px 10px 10px', // Add padding to accommodate the icon
                            borderRadius: '10px',
                            border: '1px solid blue',
                        }}
                    />
                    <FaSearch
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px', // Position the icon inside the input field
                            transform: 'translateY(-50%)',
                            color: 'black',
                            pointerEvents: 'none', // Prevent interaction with the icon
                        }}
                    />
                </Box>
                <div className="text-center">
                    <img src={banner} text="First slide" width={"95%"} height={150} />
                </div>
                {/* <Carousel slide={false} controls={false}>
                    <Carousel.Item className="text-center">
                        <ExampleCarouselImage text="First slide" />
                        <img src={test} text="First slide" width={"95%"} height={150} />
                    </Carousel.Item>
                    <Carousel.Item className="text-center">
                        <ExampleCarouselImage text="Second slide" />
                        <img src={test} text="First slide" width={"95%"} height={150} />
                    </Carousel.Item>
                    <Carousel.Item className="text-center">
                        <ExampleCarouselImage text="Third slide" />
                        <img src={test} text="First slide" width={"95%"} height={150} />
                    </Carousel.Item>
                </Carousel> */}
                {/* Section Titles and Cards */}
                <h6 className="text-center p-2 m-2 mt-3" style={{ backgroundColor: '#cd3c81', borderRadius: 4, margin: 7, color: '#f7f0fa' }}>National Assessment of Scientific Temperament & Aptitude (NASTA)</h6>
                <div className="d-flex flex-column align-items-center mx-2">
                    <div className="row p-0  w-100 gap-4">
                        <Card className="col" style={{ backgroundColor: '#e4dbfc' }}>
                            <div className=" d-flex justify-content-center align-items-center gap-1">
                                <div><PiFilesBold fontSize="30px" color="#8d52fe" /></div>
                                <div className="comtest" style={{ color: '#8d52fe' }}>NASTA PATTERN TEST</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#8c52ff', borderRadius: 5, marginBottom: 5, border: 'none', color: "#ffffff" }} onClick={handleMockTestPlayButton}>Click Here</button>
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#f1e0f0' }}>
                            <div className=" d-flex justify-content-center align-items-center gap-1">
                                <div><BsBoxes fontSize="30px" color="#cf3d81" /></div>
                                <div className="comtest" style={{ color: '#cf3d81' }}>GUIDELINES FOR NASTA 2024</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#cd3c81', borderRadius: 5, border: 'none', color: "#ffffff" }} onClick={() => GetPdfURL("Guid")}>Click Here</button>
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#e6e3e5' }}>
                            <div className=" d-flex justify-content-center align-items-center gap-1">
                                <div><IoNewspaper fontSize="30px" color="#735625" /></div>
                                <div className="comtest" style={{ color: '#735625' }}>NASTA SAMPLE PARER</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#735625', borderRadius: 5, border: 'none', color: "#ffffff" }} onClick={() => GetPdfURL("Paper")}>Click Here</button>
                        </Card>
                    </div>
                    <div className="row p-0 w-100 gap-4 mt-3 ">
                        <Card className="col" style={{ backgroundColor: '#dcecea' }}>
                            <CardContent>
                                <div className="d-flex justify-content-center align-items-center gap-1 h-75" >
                                    <div className="text-center">
                                        <div className="d-flex  gap-1" style={{ color: '#1ba553' }}><CiFaceSmile /> <FiCheckSquare /></div>
                                        <div className="d-flex gap-1" style={{ color: '#1ba553' }}><CgSmileNone /> <MdOutlineCheckBoxOutlineBlank /></div>
                                        <div className="d-flex gap-1" style={{ color: '#1ba553' }}><PiSmileySadBold /> <MdOutlineCheckBoxOutlineBlank /></div>
                                    </div>
                                    <div className="comtest" style={{ color: '#1ba553' }}>LES FOR STUDENTS</div>
                                </div>
                            </CardContent>
                            <button type="button" style={{ backgroundColor: '#1ba553', borderRadius: 5, marginBottom: 5, border: 'none', color: "#ffffff" }} onClick={handleRedirect}>Click Here</button>
                        </Card>
                        <Card className="col" style={{ backgroundColor: "#f4e7e4", paddingBottom: 5 }}>
                            <div className=" d-flex justify-content-center align-items-center gap-1 h-75">
                                <div><BsBoxes fontSize="30px" color="#e45a04" /></div>
                                <div className="comtest" style={{ color: '#e45a04' }}>NASTA SYLLABUS</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#e77a1b', borderRadius: 5, border: 'none', color: "#ffffff" }} onClick={() => GetPdfURL("Syllabus")}>Click Here</button>
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#dae4f6', paddingBottom: 5 }}>
                            <div className=" d-flex justify-content-center align-items-center gap-1 h-75" >
                                <div><PiFilesBold fontSize="30px" color="#2772c0" /></div>
                                <div className="comtest" style={{ color: '#095fb8' }}>PRACTICE TEST SUMMARY</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#095fb8', borderRadius: 5, border: 'none', color: "#ffffff" }} onClick={handlePracticeTestClick}>Click Here</button>
                        </Card>
                    </div>
                </div>
                {isPracticeTestVisible && (
                    <div className="m-2 border border-black mt-3">
                        <h6 className="text-center p-2 m-2" style={{ backgroundColor: '#095fb8', borderRadius: 2, margin: 7, color: '#ffffff' }}>NASTA PRACTICE TEST SUMMARY</h6>
                        <div className="container mt-2">
                            {/* Section: Practice Test Summary */}
                            <div className="mb-2">
                                <Carousel slide={false} controls={false} interval={null}>
                                    {groupedAttempts.map((group, groupIndex) => (
                                        <Carousel.Item key={groupIndex} className="text-center">
                                            <div className="d-flex justify-content-center">
                                                {group.map((attemptsdata, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            border: "1px solid #ccc",
                                                            textAlign: "center",
                                                            backgroundColor: "#f9f9f9",
                                                            margin: "0 10px",
                                                            width: "50%",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: "15px",
                                                                backgroundColor: "#032068",
                                                                color: "#ffffff",
                                                                padding: "5px",
                                                            }}
                                                        >
                                                            {attemptsdata.attempt}
                                                        </div>
                                                        <div className="p-1">
                                                            <div className="d-flex justify-content-between align-items-center attemptcom">
                                                                <div>Total:</div>
                                                                <div>{attemptsdata.total}</div>
                                                            </div>
                                                            <hr className="mb-0 mt-0" />
                                                            <div className="d-flex justify-content-between align-items-center attemptcom">
                                                                <div>Correct:</div>
                                                                <div>{attemptsdata.correct}</div>
                                                            </div>
                                                            <hr className="mb-0 mt-0" />
                                                            <div className="d-flex justify-content-between align-items-center attemptcom">
                                                                <div>Percentage:</div>
                                                                <div>{attemptsdata.percentage}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            {/* Section: Graph */}
                            <div className="mt-3">
                                <h6 className="text-white p-2" style={{ backgroundColor: "#7a6bbc" }}>
                                    SUMMARY BY GRAPH
                                </h6>
                                <div className="lineChatclss" style={{ backgroundColor: "#f4f4f4" }}>
                                    <Line
                                        data={graphData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: { display: true },
                                            },
                                            // scales: {
                                            //     x: { title: { display: true, text: "Attempts" } },
                                            //     y: { title: { display: true, text: "Percentage (%)" } },
                                            // },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};


export default Details;
