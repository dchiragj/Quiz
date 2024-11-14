import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaCompass } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';

const TabsCom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    
    useEffect(() => {
        if (location.pathname === '/mocktest') {
            setValue(0);
        } else if (location.pathname === '/videoplay') {
            setValue(1);
        }
    }, [location.pathname]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {  
            navigate('/mocktest');  
        } else if (newValue === 1) {  
            navigate('/videoplay');  
        }
    };

    return (
        <div className='position-fixed fixed-bottom'>
            <Box sx={{ width: '100%', backgroundColor:"#e9ecef" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab icon={<IoChatbubbleEllipses  fontSize={"20px"}/>} label="Chat" />
                    <Tab icon={<FaCompass fontSize={"20px"}/>} label="Bot Store" />
                </Tabs>
            </Box></div>
    )
}

export default TabsCom