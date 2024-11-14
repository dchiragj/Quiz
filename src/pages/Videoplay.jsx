import React, { useEffect, useState } from 'react'
import TabsCom from '../components/Tabs'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { GetURLAndStandardDetails } from '../common/getdata'
import { toast } from 'react-toastify'

const Videoplay = () => {
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=ttbTFJoNEuQ")
    // const StandardDetails = async () => {
    //     try {
    //       const response = await GetURLAndStandardDetails();
    //       setUrl(transformToEmbedUrl(response.data.videoUrl));
    //       if (response.data.status) {
    //         // toast.success(response.data.message);
    //         // localStorage.setItem("quizNo", JSON.stringify(response.data.examdetails.quizNo))
    //       } else {
    //         toast.error(response.data.message);
    //       }
    //     } catch (error) {
    //       console.log("error-->", error);
    //     }
    //   };

    const transformToEmbedUrl = (videoUrl) => {
        if (videoUrl.includes("watch?v=")) {
            return videoUrl.replace("watch?v=", "embed/");
        }
        return videoUrl; // return as-is if not a YouTube watch link
    };
    useEffect(() => {
        // console.log(url, "url");
        const embeddedUrl = transformToEmbedUrl(url);
        setUrl(embeddedUrl);
        // console.log("Embedded URL:", embeddedUrl);

        // StandardDetails()
    }, [])
    return (
        <div>
            <Box className="w-100">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        // onClick={saveAndExit}
                        >
                            <IoMdArrowRoundBack color="#000000" />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Videoplay
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="video-container">
                {url ? (
                    <iframe
                        src="https://www.youtube.com/embed/tgbNymZ7vqY"
                        className="responsive-video"
                    />
                ) : (
                    <h4 className="text-center mt-5">Loading Video...</h4>
                )}
            </div>
            {/* <h4 className='text-center mt-5'>Working Process....</h4> */}
            <TabsCom />
        </div>

    )
}
export default Videoplay
