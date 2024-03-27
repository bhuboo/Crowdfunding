import { Avatar, Box } from '@mui/material'
import React from 'react'

export default function Findinnovatormain() {
    return (
        <>
            <div className='container-fluid' style={{ background: '#F6F7F6' }}>
                <div className='row d-flex justify-content-center align-items-start'>
                    <h2 class="mb-3 mt-3 text-capitalize text-center">Find Innovator</h2>
                    <div className='col-lg-9 mb-2' style={{ background: '#ffffff' }}>
                        <Box sx={{
                            maxHeight: "60vh",
                            minHeight: "60vh",
                            overflow: "auto",
                            padding: "10px 10px 10px 10px",
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            scrollbarWidth: 'thin',
                            '&::-webkit-scrollbar': {
                                width: '0.4em',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: "#B0EACF",
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#07271F',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#07271F'
                            }
                        }}>
                            <div className='col-4 p-2' style={{ border: '1px solid gray', borderRight: '1px solid white' }}>
                                <div className='d-flex justify-content-evenly align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <Avatar alt={"data.UserName"} src="/broken-image.jpg" />
                                        <small style={{ fontSize: '14px', marginLeft: '3px' }}>dataUserName</small>
                                    </div>
                                    <div className='d-flex justify-content-evenly align-items-center'>
                                        <button className='buttoncustom'>follow</button>
                                    </div>
                                </div>
                            </div>

                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}
