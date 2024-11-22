import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaCompass } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineSchedule } from "react-icons/ai";
import { FaHome } from 'react-icons/fa';

const TabsCom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        if (location.pathname === '/details') {
            setValue(0);
        } else if (location.pathname === '/studentdetails') {
            setValue(1);
        } 
    }, [location.pathname]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            navigate('/details');
        } else if (newValue === 1) {
            navigate('/studentdetails');
        } 
    };

    return (
        <div className='position-fixed fixed-bottom'>
            <Box sx={{ width: '100%', backgroundColor: "#e9ecef" }}>
                <Tabs value={value} onChange={handleChange} sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Ensure tabs are evenly spaced
                    '& .MuiTabs-flexContainer': {
                        justifyContent: 'space-evenly',
                    },
                }}>
                    <Tab icon={<FaHome fontSize={"20px"} />} label="Home" />
                    {/* <Tab icon={<AiOutlineSchedule fontSize={"20px"} />} label="Schedule" /> */}
                    <Tab icon={<CgProfile fontSize={"20px"} />} label="Profile" />
                </Tabs>
            </Box></div>
    )
}

export default TabsCom