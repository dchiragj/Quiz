import React from 'react'
import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const MockTestSecond = () => {
    const navigate = useNavigate()

    const question = "What is the sum of 200 + 150?";
    const options = ["350", "400", "300", "450"]; 

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: '#1A1A2E', height: '100vh', color: 'white', padding: 2 }}>
            {/* Back button */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <IconButton onClick={() => navigate('/mocktestplay')} sx={{ color: 'white' }}>
                <IoMdArrowRoundBack />
                </IconButton>
                <Typography variant="h6">Maths Practice</Typography>
            </Box>

            {/* Mock Test heading */}
            <Typography variant="subtitle1" color="gray" sx={{ marginBottom: 3 }}>
                Mock Test Play
            </Typography>

            {/* Question Section */}
            <Box sx={{ backgroundColor: '#3E4C59', padding: 2, borderRadius: 2, marginBottom: 4 }}>
                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                    {question}
                </Typography>
            </Box>

            {/* Options Section */}
            <Grid container spacing={2}>
                {options.map((option, index) => (
                    <Grid item xs={6} key={index}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                color: 'white',
                                borderColor: '#1A73E8',
                                borderRadius: 2,
                                padding: 1,
                                '&:hover': {
                                    backgroundColor: '#1A73E8',
                                    color: 'white'
                                }
                            }}
                        >
                            {option}
                        </Button>
                    </Grid>
                ))}
            </Grid>

        </Container>
    )
}

export default MockTestSecond