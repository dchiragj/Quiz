
import { AppBar, Box, CardContent, CircularProgress, FormControl, IconButton, Input, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { GrMapLocation } from "react-icons/gr";
import { HiDotsVertical } from 'react-icons/hi';
import { GetStateDistrictCityList, GetUserDetails, UpdateAddress } from '../common/getdata';
import { toast } from 'react-toastify';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Addresspage = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [addressData, setAddressData] = React.useState({});
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState();
    const navigate = useNavigate();
    const [stateList, setStateList] = React.useState([]);
    const [districtList, setDistrictList] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);
    const [isEnabled, setIsEnabled] = React.useState(false);


    useEffect(() => {
        GetprofileDetails()
    }, [])
    const handleChange = (event) => {
        const { value } = event.target;
        setAddressData((prev) => ({
            ...prev,
            areaTypeID: value, // Update the selected area type ID
            areaName: value === 2 ? "Rural" : "Urban", // Update the area name
        }));
    };
    const handleAddressChange = (event) => {
        const { value } = event.target;
        setAddress(value);
    };
    const fetchDropdownData = async (flag, stateID = 0, districtID = 0) => {
        // setAddressData(addressData)
        const payload = { flag, stateID, districtID };
        try {
            const response = await GetStateDistrictCityList(payload);
            if (response.data.status) {
                setAddress(addressData.address)
                setIsEnabled(true)
                const { data } = response.data;
                switch (flag) {
                    case 'StateList':
                        setStateList(data);
                        break;
                    case 'DistrictList':
                        setDistrictList(data);
                        break;
                    case 'CityList':
                        setCityList(data);
                        break;
                    default:
                        break;
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
            toast.error('Failed to fetch data.');
        }
    };
    const handleStateChange = (event) => {
        const stateID = event.target.value;
        setAddressData((prev) => ({
            ...prev,
            stateID,
            districtID: '',
            cityID: '',
        }));
        fetchDropdownData('DistrictList', stateID);
    };

    const handleDistrictChange = (event) => {
        const districtID = event.target.value;
        setAddressData((prev) => ({
            ...prev,
            districtID,
            cityID: '',
        }));
        fetchDropdownData('CityList', 0, 5);
    };
    const handleCityChange = (event) => {
        setAddressData((prev) => ({
            ...prev,
            cityID: event.target.value,
        }));
    };
    const handleZipCodeChange = (event) => {
        const { value } = event.target;
        setAddressData((prev) => ({
            ...prev,
            pinCode: value, // Update the pinCode in addressData
        }));
    };

    const handleUpdateAddress = async () => {
        const updatedData = {
            enrollmentNo: storedUser.enrollmentNo,
            areaTypeID: Number(addressData.areaTypeID),
            address: address,
            stateID: addressData.stateID,
            districtID: addressData.districtID,
            cityID: addressData.cityID,
            pincode: addressData.pinCode,
        };
        try {
            const response = await UpdateAddress(updatedData);
            if (response.data.status) {
                toast.success(response.data.message,{
                    style:{
                        backgroundColor: '#d1e7dd',
                        color: '#0f5132'
                    }
                });
                setIsEnabled(false)
                GetprofileDetails()
            } else {
                // toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error-->", error);
        }
    };

    const GetprofileDetails = async () => {
        setLoading(true)
        try {
            const response = await GetUserDetails();
            if (response.data.status) {
                setAddressData(response.data.data[0])
                setLoading(false)
            } else {
                toast.error(response.data.message);
                setLoading(false)
            }
        } catch (error) {
            console.log("error-->", error);
        }
    }

    return (
        <div style={{ marginBottom: "50px" }}>
            <Box className="w-100" style={{ top: '0px', position: 'fixed' }}>
                <AppBar position="static">
                    <Toolbar className="d-flex justify-content-center align-items-center">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => navigate("/details")}
                        >
                            <IoMdArrowRoundBack color="#000000" />
                        </IconButton>
                        {/* <img src={photo} width={40} height={40} style={{ marginRight: 10 }} /> */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Address Details
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="offcanvas-bg" style={{ overflowY: 'auto', height: "calc(100vh - 120px)", marginTop: '50px' }}>
                <div className='m-2'>
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '200px', // Adjust height as needed
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                backgroundColor: "#dee2e6",
                                border: "1px solid #e0e0e0",
                                borderRadius: "8px",
                                padding: "8px",
                                margin: "16px 0",
                                textAlign: "center",
                                maxWidth: "600px",
                                mx: "auto", // centers horizontally
                            }}
                        >
                            <div className='d-flex justify-content-between align-items-start'>
                                <div className='d-flex flex-column align-items-start'>


                                    <div className='d-flex'>
                                        <div className='comtest'>Area Type:</div>
                                        <div>&nbsp;{addressData?.areaName}</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='comtest'>State:</div>
                                        <div>&nbsp;{addressData?.stateName}</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='comtest'>District:</div>
                                        <div>&nbsp;{addressData?.districtName} </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='comtest'>City :</div>
                                        <div>&nbsp;{addressData?.cityName}</div>
                                    </div>

                                    <div className='d-flex'>
                                        <div className='comtest'>Pin Code:</div>
                                        <div>&nbsp;{addressData?.pinCode}</div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className='comtest'>Address: </div>
                                        <div className='text-left'>&nbsp;{addressData?.address}</div>
                                    </div>
                                </div>
                                <div> <button className='btn btn-outline-primary' onClick={() => fetchDropdownData('StateList')}  >Edit</button></div>
                            </div>
                        </Box>
                    )}
                </div>
                {isEnabled ? <>
                <div style={{fontWeight:600 ,textAlign:"center",margin:"5px"}}>Update Address</div>
                    <div className='mx-2'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Area type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Area type:"
                                    value={addressData?.areaTypeID}
                                    onChange={handleChange}
                                // disabled={isEnabled}
                                >
                                    <MenuItem value="1">Rural </MenuItem>
                                    <MenuItem value="2">Urban </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='mx-2 my-3'>
                        <Box >
                            <TextareaAutosize label="Address:" style={{ width: "100%", backgroundColor: "#f6f6fe" }}
                                aria-label="minimum height" minRows={2}
                                placeholder="address..."
                                defaultValue={address} onChange={handleAddressChange} />
                        </Box>
                    </div>
                    <div className='mx-2 '>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">State:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="State:"
                                    value={addressData.stateID || ''}
                                    onChange={handleStateChange}
                                >
                                    {/* <MenuItem value={addressData.stateID}>{addressData.cityName}</MenuItem> */}
                                    {stateList && stateList?.map((state) => (
                                        <MenuItem key={state.stateID} value={state.stateID}>
                                            {state.stateName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='mx-2 my-3'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">District:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="District:"
                                    value={addressData.districtID || ""}
                                    onChange={handleDistrictChange}

                                >
                                    <MenuItem value={addressData.districtID}>{addressData.districtName}</MenuItem>
                                    {districtList && districtList?.map((state) => (
                                        <MenuItem key={state.districtID} value={state.districtID}>
                                            {state.districtName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                    </div>
                    <div className='mx-2'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="City:"
                                    value={addressData.cityID || ""}
                                    onChange={handleCityChange}

                                >
                                    <MenuItem value={addressData.cityID}>{addressData.cityName}</MenuItem>
                                    {cityList.map((state) => (
                                        <MenuItem key={state.cityID} value={state.cityID}>
                                            {state.cityName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='mx-2 my-3'>
                        <Box sx={{ width: "auto", maxWidth: 'auto' }}>
                            <TextField fullWidth label="Zip Code:" id="Zip Code" multiline
                                rows={1}
                                defaultValue={addressData?.pinCode} inputProps={{
                                    maxLength: 6, 
                                    inputMode: 'numeric', 
                                    pattern: '[0-9]*', 
                                  }} onChange={handleZipCodeChange}/>
                        </Box>
                    </div>
                    <div className="text-center mt-3 mb-3">
                        <Button
                            variant="contained"
                            // fullWidth
                            style={{ backgroundColor: "#1976d2", font: "bold", color: '#fff' }}
                            onClick={handleUpdateAddress}
                        >
                            Update Address
                        </Button>

                    </div>
                </> : <></>}
            </div>
        </div>
    )
}

export default Addresspage