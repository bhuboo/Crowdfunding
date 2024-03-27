import { Typography } from '@mui/joy'
import { Avatar, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Initialapicall, followrequestapi } from '../../../AxiosCallfunctions/enterprenour/bussinessIdeas';
import { Link } from 'react-router-dom';

export default function BussinessIdeaPostCode() {

    const [InitialState, setInitialState] = useState([]);

    const intitialandbussinessIdeaapi = () => {
        Initialapicall()
            .then((result) => {
                if (result.status == 200) {
                    const response = result.data.response;
                    setInitialState(response)
                }
            });

    }

    const followrequestapihandle = async (e) => {
        const result = await followrequestapi(e);

        if (result.status == 200) {
            intitialandbussinessIdeaapi();
        }
    }
    useEffect(() => {
        intitialandbussinessIdeaapi();
    }, [])

    if (InitialState === null) {
        // Initial state is not yet set, you can render a loading indicator or placeholder
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className='container-fluid' style={{ background: '#F6F7F6' }}>
                <div className='row d-flex justify-content-center align-items-start'>
                    <div className='col-lg-10' style={{ background: '#ffffff' }}>
                        <Box sx={{
                            maxHeight: "80vh",
                            overflow: "auto",
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
                            {
                                InitialState.length > 0 &&
                                InitialState.map((data, key) => (
                                    <>
                                        <div className='w-100 bg-primary-light postmaincontainer' key={key}>
                                            <div className='pt-3 pl-5'>
                                                <div className='d-flex post-Container justify-content-between'>
                                                    <div className='d-flex align-items-center'>
                                                        <Avatar alt={data.UserName} src="/broken-image.jpg" />
                                                        <small style={{ fontSize: '14px' }}>{data.UserName}</small>
                                                    </div>
                                                    <div className='d-flex align-items-center subcontainer-post'>
                                                        <small>{data.IdeaCreatedon}</small>
                                                        {
                                                            data.Followedexist ?
                                                                <button onClick={() => followrequestapihandle(data.UserId)}>Unfollow</button>
                                                                :
                                                                <button onClick={() => followrequestapihandle(data.UserId)}>Follow</button>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='row d-flex justify-content-center mt-2'>
                                                    <div className='col-11 d-flex'>
                                                        <div className='col-6'>
                                                            <label>Bussiness Name :
                                                                <Link to={`/bussinessIdeas/${data.UserId}/${data.BussinessId}`} >
                                                                    <span
                                                                        style={{ color: '#343434', textDecoration: 'underline', fontSize: '16px', fontWeight: 'bolder', paddingLeft: '4px', fontStyle: 'italic' }}
                                                                    >{data.BussinessName}
                                                                    </span>
                                                                </Link>
                                                            </label>
                                                            <br />
                                                            <label>Initial Investment :
                                                                <span
                                                                    style={{ color: '#343434', textDecoration: 'none', fontSize: '16px', paddingLeft: '4px' }}
                                                                >₹{data.InitialInvestment}
                                                                </span>
                                                            </label>
                                                        </div>
                                                        <div className='col-6'>
                                                            <label>Bussiness Type :
                                                                <span
                                                                    style={{ color: '#343434', textDecoration: 'none', fontSize: '16px', paddingLeft: '4px' }}
                                                                >{data.BussinessType}
                                                                </span>
                                                            </label>
                                                            <br />
                                                        </div>
                                                        <br />
                                                    </div>
                                                    <div className='row d-flex justify-content-center mt-2'>
                                                        <div className='col-12'>
                                                            <label>Abstract :</label>
                                                            <textarea
                                                                className="form-control shadow-none"
                                                                style={{ minHeight: '200px' }}
                                                                value={data.Abstract} >
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }

                        </Box>

                    </div>

                </div >
            </div >
        </>
    )
}
