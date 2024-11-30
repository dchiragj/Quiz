
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosLogOut } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiBookmark } from "react-icons/ci";
import { BiLogoGmail } from "react-icons/bi";
import { MdContactPhone } from 'react-icons/md';
import { IoCall } from 'react-icons/io5';
import { BsBrowserChrome, BsWhatsapp } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import demo from '../assets/user-image.jpg'
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

    return (
        <>
            {isOpen &&
                <Offcanvas show={isOpen} onHide={() => setIsOpen(false)} className="offcanvas-bg">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Profile Details</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                        <div className='text-center'>
                            <img src={storedUser?.userImage} width={100} height={100} className="rounded-circle" />
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
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-5 pb-2 border-bottom ' style={{ color: 'red', cursor: "pointer" }} onClick={handleLogout}>
                            <Avatar sx={{ backgroundColor: '#ff66c4' }}><TbLogout /> </Avatar>
                            <div> Log Out</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-1 p-2 mt-5' style={{ backgroundColor: '#095fb8', color: 'white' }}>
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
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-3 border-bottom pb-1 mt-2'>
                            <Avatar sx={{ backgroundColor: '#5e17eb' }}><BsBrowserChrome /></Avatar>
                            <div>www.kamp.org.in</div>
                        </div>
                    </Offcanvas.Body>
                    {/* <Button className='text-center mx-auto'>
                            <IoIosLogOut color='black' size={25} className='mr-2' />
                            Log Out
                        </Button> */}

                </Offcanvas>
            }
        </>
    );
}

export default Sidebar;