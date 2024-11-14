
import { Avatar } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoIosLogOut } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CiBookmark } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";

function Sidebar({ isOpen, setIsOpen, user }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        setIsOpen(false);  // Close the Sidebar
        navigate("/studentlogin?message=logout");  // Navigate to login page with a message parameter
    };

    return (
        <>
            {isOpen &&
                <Offcanvas show={isOpen} onHide={() => setIsOpen(false)}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Profile Details</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='d-flex justify-content-between align-items-center border-bottom pb-3 mb-3'>
                            <div className='d-flex justify-content-start align-items-center gap-3  ' >
                                <Avatar sx={{ bgcolor: deepPurple[500] }}><FaRegUserCircle /></Avatar>
                                <p style={{ paddingTop: '13px' }}>{user?.userName}</p>
                            </div>
                            <FaChevronRight fontSize={25} onClick={() => setIsOpen(false)} />
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-3 border-bottom pb-3'>
                            <div ><CiBookmark fontSize={30} /></div>
                            <div>Saved Messages</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-3 border-bottom pb-3'>
                            <div><IoIosSettings fontSize={30} /> </div>
                            <div>Setting</div>
                        </div>
                        <div className='d-flex justify-content-start align-items-center gap-4 mb-3 ' style={{ color: 'red', cursor: "pointer" }} onClick={handleLogout}>
                            <div><IoIosLogOut fontSize={30} /> </div>
                            <div> Log Out</div>
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