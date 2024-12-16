
import { AppBar, Box, CardContent, FormControl, IconButton, Input, InputLabel, MenuItem, Select, TextareaAutosize, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { GrMapLocation } from "react-icons/gr";
import { HiDotsVertical } from 'react-icons/hi';
import { GetStateDistrictCityList, UpdateAddress } from '../common/getdata';
import { toast } from 'react-toastify';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Addresspage = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [addressData, setAddressData] = React.useState(JSON.parse(localStorage.getItem("user")));
    const [formData, setFormData] = useState();
    const navigate = useNavigate();
    const [stateList, setStateList] = React.useState([]);
    const [districtList, setDistrictList] = React.useState([]);
    const [cityList, setCityList] = React.useState([]);
    const [isEnabled, setIsEnabled] = React.useState(false);

    const handleChange = (event) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            areaTypeID: value, // Update the selected area type ID
            areaName: value === "2" ? "Rural" : "Urban", // Update the area name
        }));
    };
    const handleAddressChange = (event) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            address: value, // Update the address in formData
        }));
    };
    const fetchDropdownData = async (flag, stateID = 0, districtID = 0) => {
        setFormData(addressData)
        const payload = { flag, stateID, districtID };
        try {
            const response = await GetStateDistrictCityList(payload);
            if (response.data.status) {
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
        console.log(stateID, "stateID");

        setFormData((prev) => ({
            ...prev,
            stateID,
            districtID: '',
            cityID: '',
        }));
        fetchDropdownData('DistrictList', stateID);
    };

    const handleDistrictChange = (event) => {
        const districtID = event.target.value;
        setFormData((prev) => ({
            ...prev,
            districtID,
            cityID: '',
        }));
        fetchDropdownData('CityList', 0, districtID);
    };
    const handleCityChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            cityID: event.target.value,
        }));
    };
    const handleUpdateAddress = async () => {

        const updatedData = {
            enrollmentNo: storedUser.enrollmentNo,
            areatype: formData.areaTypeID,
            address: formData.address,
            state: formData.stateID,
            distcit: formData.districtID,
            city: formData.cityID,
            pincode: formData.pinCode,
        };
        try {
            const response = await UpdateAddress(updatedData);
            if (response.data.status) {
                toast.success(response.data.message);
                setIsEnabled(false)
            } else {
                // toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error-->", error);
        }
    };


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
                            ADDRESS
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <div className="offcanvas-bg" style={{ overflowY: 'auto', height: "calc(100vh - 120px)", marginTop: '50px' }}>
                <div className='m-2'>
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
                            <div> <Button onClick={() => fetchDropdownData('StateList')}  >Edit</Button></div>
                        </div>
                        {/* <div className='d-flex justify-content-between align-items-center'>
                            <div className='comtest'>{formData?.candidate_Name}</div>
                            <Button onClick={() => fetchDropdownData('StateList')}  ><MdModeEdit />Edit</Button>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div><GrMapLocation fontSize="25px" /></div>
                            <div className='ml-4'>{formData?.address}</div>
                        </div> */}

                    </Box>
                </div>



                {isEnabled ? <>
                    <div className='mx-2'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Area type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Area type:"
                                    value={formData?.areaTypeID}
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
                            <TextareaAutosize   label="Address:" style={{ width: "100%"}}
                                aria-label="minimum height" minRows={2} 
                                placeholder="address..."
                                defaultValue={formData?.address} onChange={handleAddressChange} />
                        </Box>
                        {/* <div className='d-flex justify-content-between align-items-start'>
                    <div className='labletyle'>Address:</div>
                    <TextField id="outlined-multiline-static"
                        multiline
                        rows={2}
                        defaultValue={formData?.address}
                        disabled={isEnabled}
                    />
                </div> */}
                    </div>
                    <div className='mx-2 '>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">State:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="State:"
                                    value={formData.stateID || ''} onChange={handleStateChange}
                                >
                                    <MenuItem value={formData.stateID}>{formData.stateName}</MenuItem>
                                    {stateList && stateList.map((state) => (
                                        <MenuItem key={state.stateId} value={state.stateId}>
                                            {state.stateName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {/* <div className='d-flex justify-content-between align-items-center'>
                    <div className='labletyle'>State:</div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                        <Select value={formData.stateID || ''} onChange={handleStateChange} disabled={isEnabled}>
                            <MenuItem value={formData.stateID}>{formData.stateName}</MenuItem>
                            {stateList && stateList.map((state) => (
                                <MenuItem key={state.stateId} value={state.stateId}>
                                    {state.stateName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div> */}
                    </div>
                    <div className='mx-2 my-3'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">District:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="District:"
                                    value={formData.districtID || ""}
                                    onChange={handleDistrictChange}

                                >
                                    <MenuItem value={formData.districtID}>{formData.districtName}</MenuItem>
                                    {districtList.map((state) => (
                                        <MenuItem key={state.districtId} value={state.districtId}>
                                            {state.districtName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* <div className='d-flex justify-content-between align-items-center'>
                    <div className='labletyle'>District:</div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} >
                        <Select
                            value={formData.districtID || ""}
                            onChange={handleDistrictChange}
                            disabled={isEnabled}
                        >
                            <MenuItem value={formData.districtID}>{formData.districtName}</MenuItem>
                            {districtList.map((state) => (
                                <MenuItem key={state.districtId} value={state.districtId}>
                                    {state.districtName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div> */}
                    </div>
                    <div className='mx-2'>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="City:"
                                    value={formData.cityID || ""}
                                    onChange={handleCityChange}

                                >
                                    <MenuItem value={formData.cityID}>{formData.cityName}</MenuItem>
                                    {cityList.map((state) => (
                                        <MenuItem key={state.cityID} value={state.cityID}>
                                            {state.cityName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {/* <div className='d-flex justify-content-between align-items-center'>
                    <div className='labletyle'>City:</div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} >
                        <Select
                            value={formData.cityID || ""}
                            onChange={handleCityChange}
                            disabled={isEnabled}
                        >
                            <MenuItem value={formData.cityID}>{formData.cityName}</MenuItem>
                            {cityList.map((state) => (
                                <MenuItem key={state.cityID} value={state.cityID}>
                                    {state.cityName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div> */}
                    </div>
                    <div className='mx-2 my-3'>
                        {/* <Box sx={{ width: 500, maxWidth: '100%' }}>
                    <TextField fullWidth label="Zip Code:" defaultValue={formData.pinCode || ''} disabled={isEnabled} />
                </Box> */}
                        <Box sx={{ width: "auto", maxWidth: 'auto' }}>
                            <TextField fullWidth label="Zip Code:" id="Zip Code" multiline
                                rows={1}
                                defaultValue={formData?.pinCode} />
                        </Box>
                        {/* <div className='d-flex justify-content-between align-items-center'>
                    <div className='labletyle'>Zip Code:</div>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} >
                        <Input placeholder="Placeholder" value={formData.pinCode} disabled={isEnabled} />
                    </FormControl>
                </div> */}
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