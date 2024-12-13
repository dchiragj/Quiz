
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosLogOut } from "react-icons/io";
import { FaChevronRight, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiBookmark } from "react-icons/ci";
import { BiLogoGmail } from "react-icons/bi";
import { MdContactPhone } from 'react-icons/md';
import { IoCall } from 'react-icons/io5';
import { BsBrowserChrome, BsTwitterX, BsWhatsapp } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import demo from '../assets/userimg.jpg'
import { FaAddressCard } from 'react-icons/fa6';
function Sidebar({ isOpen, setIsOpen, user }) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        setIsOpen(false);  // Close the Sidebar
        navigate("/studentlogin?message=logout");  // Navigate to login page with a message parameter
    };
    const handelnaviget = () => {
        navigate("/studentdetails");
        setIsOpen(false)
    }

    const handeladdress = () =>{
        navigate("/address");
        setIsOpen(false)
    }

    return (
        <>
            {isOpen &&
                <Offcanvas show={isOpen} onHide={() => setIsOpen(false)} className="offcanvas-bg">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Profile Details</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                        <div className='text-center'>
                            <div style={{ position: "relative", display: "inline-block" }}>
                                {/* Profile Image */}
                                <img
                                    src={storedUser?.imageUrl || demo}
                                    alt="User"
                                    width={100}
                                    height={100}
                                    className="rounded-circle"
                                    style={{
                                        border: "2px solid #fdd835", // Optional styling
                                        backgroundColor: "#fdd835",
                                    }}
                                />
                                {/* Add Icon */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 5,
                                        right: 5,
                                        width: 25,
                                        height: 25,
                                        backgroundColor: "#4285f4",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid #fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ color: "#fff", fontSize: "16px", fontWeight: "bold" }}>+</span>
                                </div>
                            </div>
                            <div>{storedUser?.candidate_Name}</div>
                            <div className='border-bottom'>{storedUser?.schoolCode}-{storedUser?.schoolName}</div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center border-bottom pb-3 mb-1'>
                            <div className='d-flex justify-content-start align-items-center gap-3  ' >
                                <Avatar sx={{ bgcolor: deepPurple[500] }}><FaRegUserCircle /></Avatar>
                                <p style={{ paddingTop: '13px' }}>User Profile</p>
                            </div>
                            <FaChevronRight fontSize={25} onClick={handelnaviget} />
                        </div>
                        {/* <div className='d-flex justify-content-start align-items-center gap-4 mb-3 border-bottom pb-3'>
                            <div ><CiBookmark fontSize={30} /></div>
                            <div>Saved Messages</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-3 border-bottom pb-3'>
                            <div><IoIosSettings fontSize={30} /> </div>
                            <div>Setting</div>
                        </div> */}
                      
                        <div className='d-flex justify-content-between align-items-center border-bottom pb-1'>
                            <div className='d-flex justify-content-start align-items-center gap-3' >
                                <Avatar sx={{ backgroundColor:'#B09FCA'}}><FaAddressCard  /></Avatar>
                                <p style={{ paddingTop: '13px' }}>Address</p>
                            </div>
                            <FaChevronRight fontSize={25} onClick={handeladdress} />
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-1 p-2 mt-2' style={{ backgroundColor: '#095fb8', color: 'white' }}>
                            <div><MdContactPhone style={{ fontSize: 30 }} /></div>
                            <div>CONTACT US</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-1 border-bottom pb-1 mt-3'>
                            <Avatar sx={{ backgroundColor: '#881e4c' }}><BiLogoGmail /></Avatar>
                            <div>info@kamp.org.in</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-1 border-bottom pb-1 mt-2'>
                            <Avatar sx={{ backgroundColor: '#e45a04' }}><IoCall /></Avatar>
                            <div>
                                <div>+91-9599576228,</div>
                                <div>+91-9289359694</div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-1 border-bottom pb-1 mt-2'>
                            <Avatar sx={{ backgroundColor: '#1ba553' }}><BsWhatsapp /></Avatar>
                            <div>+91-9717435123</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-1 border-bottom pb-1 mt-2'>
                            <Avatar sx={{ backgroundColor: '#5e17eb' }}><BsBrowserChrome /></Avatar>
                            <div>www.kamp.org.in</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 border-bottom pb-1 mt-2' style={{ color: 'red', cursor: "pointer" }} onClick={handleLogout}>
                            <Avatar sx={{ backgroundColor: '#ff66c4' }}><TbLogout /> </Avatar>
                            <div> Log Out</div>
                        </div>
                    </Offcanvas.Body>
                    {/* Footer Section */}
                    <div className="text-center p-3" style={{ backgroundColor: '#e9ecef', height: "100px" }}>
                        <div style={{ fontWeight: 500 }}>Follow us on</div>
                        <div className="d-flex justify-content-center gap-2 mt-2">
                            <a href="https://www.facebook.com/kampnasta" target="_blank" rel="noopener noreferrer">
                                <Avatar sx={{ backgroundColor: '#2b72eb', cursor: 'pointer', width: 30, height: 30 }}>
                                    <FaFacebook />
                                </Avatar>
                            </a>
                            <a href="https://www.youtube.com/channel/UCUEF4kDXx_gpHO1Qlc29KnQ" target="_blank" rel="noopener noreferrer">
                                <Avatar sx={{ backgroundColor: '#e02121', width: 30, height: 30 }}>
                                    <FaYoutube />
                                </Avatar>
                            </a>
                            <a href="https://www.instagram.com/kampnasta/" target="_blank" rel="noopener noreferrer">
                                <Avatar sx={{ backgroundColor: '#bc4d58', width: 30, height: 30 }}>
                                    <FaInstagram />
                                </Avatar>
                            </a>
                            <a href="https://in.linkedin.com/company/kampnasta" target="_blank" rel="noopener noreferrer">
                                <Avatar sx={{ backgroundColor: '#080fee', width: 30, height: 30 }}>
                                    <FaLinkedin />
                                </Avatar>
                            </a>
                            <a href="https://x.com/Kampnasta" target="_blank" rel="noopener noreferrer">
                                <Avatar sx={{ backgroundColor: '#302f32', width: 30, height: 30 }}>
                                    <BsTwitterX />
                                </Avatar>
                            </a>
                        </div>
                    </div>
                </Offcanvas>
            }
        </>
    );
}

export default Sidebar;