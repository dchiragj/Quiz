
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import MockTest from './pages/MockTest';
import MockTestPlay from './pages/MockTestPlay';
import MockTestSecond from './pages/FaceCapture';
import LoginPage from './pages/LoginPage';
import StudentLogin from './pages/StudentLogin';
import OtpVerification from './pages/OtpVerification';
import { AuthProvider } from './pages/context/AuthContext';
import ExamInstructions from './pages/ExamInstructions';
import StudentDetails from './pages/StudentDetails';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FaceCapture from './pages/FaceCapture';
import IdCardCapture from './pages/IdCardCapture';
import { useState } from 'react';
import Sidebar from './pages/Offcanvas';
import FeedBackForm from './pages/FeedBackForm';
import Videoplay from './pages/Videoplay';
import Details from './pages/Details';
import TabsCom from './components/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  return (
    <>
    <AuthProvider>
    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}  user={user}/>
      <Routes >
        {/* <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/studentlogin" element={<AuthProvider><StudentLogin /></AuthProvider>} />
        <Route path="/otp" element={<AuthProvider><OtpVerification /></AuthProvider>} /> */}
        <Route path="/details" element={<AuthProvider><Details isOpen={isOpen} setIsOpen={setIsOpen}/></AuthProvider>} />
        <Route path="/studentdetails" element={<AuthProvider><StudentDetails isOpen={isOpen} setIsOpen={setIsOpen}  user={user} setUser={setUser}/></AuthProvider>} />
        <Route path="/mocktest" element={<AuthProvider><MockTest /></AuthProvider>} />
        <Route path="/mocktestplay" element={<AuthProvider><MockTestPlay /></AuthProvider>} />
        <Route path="/mocktestsecond" element={<MockTestSecond />} />
        <Route path="/examintroduction" element={<ExamInstructions />} />
        <Route path="/facecapture" element={<FaceCapture />} />
        <Route path="/feedback" element={<FeedBackForm />} />
        <Route path="/idcard" element={<AuthProvider><IdCardCapture /></AuthProvider>} />
        <Route path="/videoplay" element={<Videoplay />} />

      </Routes>
    </AuthProvider>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TabsCom/>
    </>
  );
}


export default App;
