import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { AppBar, Avatar, CardActions, Toolbar } from "@mui/material";
import { Carousel, Toast } from "react-bootstrap";
import { FaBookOpenReader, FaDownload, FaListCheck, FaPaperPlane } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { RiSurveyLine, RiTeamLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png"
import { IoMdCloudDownload, IoMdMenu } from "react-icons/io";
import { GiNotebook, GiTeacher } from "react-icons/gi";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { GetTotalQuizzAttemptList, GetUserDetails, PdfURL, QuizQuestionsList } from "../common/getdata";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";
import kamplogo from "../assets/kamplogo.png";
import LES from "../assets/les.png";
import { saveAs } from 'file-saver';
import { RxCross1 } from "react-icons/rx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const Details = ({ isOpen, setIsOpen, setUser }) => {
    const { setMockTestData } = useContext(AuthContext);
    const [isPracticeTestVisible, setIsPracticeTestVisible] = useState(false); // State to manage visibility
    const [attempts, setAttempts] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [showIframe, setShowIframe] = useState(false);

    const [showMessage, setShowMessage] = useState(false);
    const tokenString = params.get("token")
    if (tokenString) {
        localStorage.setItem('tokenGet', tokenString);
    }
    const navigate = useNavigate();
    const handlePracticeTestClick = () => {
        setIsPracticeTestVisible(!isPracticeTestVisible); // Toggle visibility
    };
    const handleRedirect = () => {
        window.location.href = `https://kamp.org.in/lesform?e=${userDetails?.enrollmentNo}`;
    }
    const downloadPdf = (pdfUrl) => {
        alert(pdfUrl)
        if (!pdfUrl) {
            alert('PDF URL is not available');
            return;
        }
        try {
            // Create an anchor element to trigger the download
            const downloadLink = document.createElement("a");
            const fileName = 'randomAppName.apk';
            downloadLink.href = pdfUrl;
            downloadLink.rel = 'noreferrer'
            downloadLink.download = fileName;
            console.log("downloadLink: ", downloadLink)
            alert("downloadLink: ", downloadLink)
            downloadLink.click();
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Failed to download the PDF. Please try again.');
        }
    };

    // Simulate login success - Replace this with your actual login logic
    useEffect(() => {
        const loginSuccess = true; // Replace this with the actual login success condition
        if (loginSuccess) {
            setShowMessage(true); // Show message when login is successful
        }
    }, []);

    // Hide the message after 5 seconds
    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 5000);
            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [showMessage]);
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
                // toast.success(response.data.message);
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
                setUserDetails(response.data.data[0])
                localStorage.setItem("user", JSON.stringify(response.data.data[0]));
                setUser(response.data.data)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error-->", error);
        }
    }
    const GetPdfURL = async (flag) => {
        // alert(flag)
        try {
            setLoading(true);
            const response = await PdfURL(flag); // Fetch the URL from API
            if (response.data.data && response.data.data._PdfURL) {
                console.log(response.data.data);

                const fetchedPdfUrl = response.data.data._PdfURL;
                window.location.href = `${window.location.origin}${window.location.pathname}?pdfUrl=${fetchedPdfUrl}`;
                // setPdfUrl(fetchedPdfUrl); // Set the fetched URL

                // Open the PDF URL in a new tab
                // window.open(fetchedPdfUrl, '_blank');
            } else {
                alert('PDF not available for this class.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error opening PDF URL:', error);
            alert('Failed to fetch PDF. Please try again.');
            setLoading(false);
        }
    };

    const pdfUrltest = "https://quizb.clustersofttech.com/pdf/Assessment_Guidelines.pdf";

    const openInNewTab = () => {
        alert(pdfUrltest)
        window.open(pdfUrltest, "_blank");
    };
    useEffect(() => {
        handleAttemptList()
        GetprofileDetails()
    }, [])
    return (

        <div style={{ marginBottom: '80px' }}>
            <Box className="w-100" style={{ backgroundColor: 'white' }}>
                <AppBar position="static">
                    <Toolbar className="d-flex justify-content-center align-items-center" style={{ backgroundColor: 'white' }}>
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
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: 12, textAlign: "center", color: 'black' }}>
                            KNOWLEDGE AND AWARENESS MAPPING PLATFORM
                        </Typography>
                        <div className=" ">
                            <img src={kamplogo} alt="" style={{ width: 75, height: 40, color: 'blue' }} />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <div style={{ backgroundColor: "#f3f0f6", backgroundSize: "cover", backgroundPosition: "center" ,overflowY:'auto',height: "calc(100vh - 136px)"}}>
                {/* {showMessage && (
                    <div className="m-2" style={{ color: 'green' }}>
                        Welcome! You have successfully logged in.
                    </div>
                )} */}
                {/* Welcome Text */}
                <div className="m-2 font-weight-bold">
                    Hi, {userDetails?.candidate_Name}
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

                {/* <button type="button" style={{ backgroundColor: '#8c52ff', borderRadius: 5, marginBottom: 5, color: "#ffffff", border: '1px solid #282426' }} onClick={openInNewTab} >Click Here</button> */}
                {/* <a href={pdfUrltest} target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#8c52ff', borderRadius: 5, marginBottom: 5, color: "#ffffff", border: '1px solid #282426' }}>cilck here</a> */}
                <div className="text-center p-2 m-2 mt-3 fw-bolder" style={{ backgroundColor: '#cd3c81', borderRadius: 4, margin: 7, color: '#f7f0fa' }}>National Assessment of Scientific Temperament & Aptitude</div>
                <div className="d-flex flex-column align-items-center mx-2 mt-4">
                    <div id="pdf-iframe-container" style={{ width: '100%', height: '80vh', display: "none" }}></div>
                    <div className="row p-0  w-100 gap-4">
                        <Card className="col" style={{ backgroundColor: '#e4dbfc', padding: '10px' }} onClick={handleMockTestPlayButton}>
                            <div className=" d-flex flex-column justify-content-center align-items-center gap-2 text-center">
                                <div><FaBookOpenReader fontSize="30px" color="#8d52fe" /></div>
                                <div className="comtest" style={{ color: '#8d52fe' }}>PRACTICE TEST</div>
                            </div>
                            {/* <button type="button" style={{ backgroundColor: '#8c52ff', borderRadius: 5, marginBottom: 5, color: "#ffffff", border: '1px solid #282426' }} onClick={handleMockTestPlayButton} >Click Here</button> */}
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#f1e0f0', padding: '10px' }} onClick={() => GetPdfURL("Guid")}>
                            <div className=" d-flex justify-content-center align-items-center gap-2 flex-column text-center">
                                <div><GiTeacher fontSize="30px" color="#cf3d81" /></div>
                                <div className="comtest" style={{ color: '#cf3d81' }}>GUIDELINES FOR 2024</div>
                            </div>
                            {/* <button type="button" style={{ backgroundColor: '#cd3c81', borderRadius: 5, border: 'none', color: "#ffffff", border: '1px solid #282426' }} onClick={() => GetPdfURL("Guid")}>Click Here</button> */}
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#e6e3e5', padding: '10px' }} onClick={() => GetPdfURL("Paper")}>
                            <div className=" d-flex justify-content-center align-items-center gap-2 flex-column text-center">
                                <div><GiNotebook fontSize="30px" color="#735625" /></div>
                                <div className="comtest" style={{ color: '#735625' }}>SAMPLE PAPER</div>
                            </div>
                            {/* <button type="button" style={{ backgroundColor: '#735625', borderRadius: 5, border: 'none', color: "#ffffff", border: '1px solid #282426' }} onClick={() => GetPdfURL("Paper")}>Click Here</button> */}
                        </Card>
                    </div>
                    <div className="row p-0  w-100 gap-4 mt-3">
                        <Card className="col" style={{ backgroundColor: '#dcecea', padding: '10px' }} onClick={handleRedirect}>
                            <div className=" d-flex justify-content-center align-items-center gap-2 flex-column text-center" style={{ marginBottom: "18px" }}>
                                <div><RiSurveyLine fontSize="30px" color="#1ba553" /></div>
                                <div className="comtest" style={{ color: '#1ba553' }}>LES FOR STUDENTS</div>
                            </div>
                            {/* <button type="button" style={{ backgroundColor: '#1ba553', borderRadius: 5, marginBottom: 5, color: "#ffffff", border: '1px solid #282426' }} onClick={handleRedirect} >Click Here</button> */}
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#f4e7e4', padding: '10px' }} onClick={() => GetPdfURL("Syllabus")}>
                            <div className=" d-flex justify-content-center align-items-center gap-2 flex-column text-center" style={{ marginBottom: "18px" }}>
                                <div><FaListCheck fontSize="30px" color="#e45a04" /></div>
                                <div className="comtest" style={{ color: '#e45a04' }}> SYLLABUS</div>
                            </div>
                            {/* <button type="button" style={{ backgroundColor: '#e77a1b', borderRadius: 5, border: 'none', color: "#ffffff", border: '1px solid #282426' }} onClick={() => GetPdfURL("Syllabus")}>Click Here</button> */}
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#dae4f6', padding: '10px' }} onClick={handlePracticeTestClick}>
                            <div className=" d-flex justify-content-center align-items-center gap-2 flex-column text-center" >
                                <div><FaPaperPlane fontSize="30px" color="#2772c0" /></div>
                                <div className="comtest" style={{ color: '#095fb8' }}>PRACTICE TEST SUMMARY</div>
                            </div>
                            {/* <button type="button" style={{ backgroundColor: '#095fb8', borderRadius: 5, border: 'none', color: "#ffffff", border: '1px solid #282426' }} onClick={handlePracticeTestClick}>Click Here</button> */}
                        </Card>
                    </div>
                    {/* <div className="row p-0 w-100 gap-4 mt-3 ">
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
                                <div><FaListCheck fontSize="30px" color="#e45a04" /></div>
                                <div className="comtest" style={{ color: '#e45a04' }}>NASTA SYLLABUS</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#e77a1b', borderRadius: 5, border: 'none', color: "#ffffff" }} onClick={() => GetPdfURL("Syllabus")}>Click Here</button>
                        </Card>
                        <Card className="col" style={{ backgroundColor: '#dae4f6', paddingBottom: 5 }}>
                            <div className=" d-flex justify-content-center align-items-center gap-1 h-75" >
                                <div><FaPaperPlane fontSize="30px" color="#2772c0" /></div>
                                <div className="comtest" style={{ color: '#095fb8' }}>PRACTICE TEST SUMMARY</div>
                            </div>
                            <button type="button" style={{ backgroundColor: '#095fb8', borderRadius: 5, border: 'none', color: "#ffffff"}} onClick={handlePracticeTestClick}>Click Here</button>
                        </Card>
                    </div> */}
                </div>

                {!isPracticeTestVisible && (<div className="text-center mt-3">
                    <img src={LES} width={"95%"} height={150} />
                </div>)}
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
                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                <div className="attemptcom">Total Questions</div>
                                                                <div>{attemptsdata.total}</div>
                                                            </div>
                                                            <hr className="mb-0 mt-0" />
                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                <div className="attemptcom">Total Correct</div>
                                                                <div>{attemptsdata.correct}</div>
                                                            </div>
                                                            <hr className="mb-0 mt-0" />
                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                <div className="attemptcom">Precentage</div>
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
