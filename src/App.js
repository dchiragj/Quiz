
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import MockTest from './pages/MockTest';
import MockTestPlay from './pages/MockTestPlay';
import MockTestSecond from './pages/MockTestSecond';
import LoginPage from './pages/LoginPage';
import StudentLogin from './pages/StudentLogin';
import OtpVerification from './pages/OtpVerification';
import { AuthProvider } from './pages/context/AuthContext';

function App() {
  return (
    <>
      <Routes >

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/studentlogin" element={<AuthProvider><StudentLogin /></AuthProvider>} />
        <Route path="/otp" element={<AuthProvider><OtpVerification /></AuthProvider>} />

        <Route path="/mocktest" element={<MockTest />} />
        <Route path="/mocktestplay" element={<MockTestPlay />} />
        <Route path="/mocktestsecond" element={<MockTestSecond />} />

      </Routes>
    </>
  );
}


export default App;
