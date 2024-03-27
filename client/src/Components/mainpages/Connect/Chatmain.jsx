import { Avatar, Box } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import moment from 'moment';

export default function Chatmain() {

    const { user } = useContext(AuthContext);
    const [Chatlistdetail, setChatlistdetail] = useState(null);
    const [Chatmessages, setChatmessages] = useState(null);
    const [ChatUsername, setChatUsername] = useState(null);
    const [inputmessage, setinputmessage] = useState("");
    const [receiverId, setreceiverId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;;
    };

    const ChatlistGet = async (e) => {
        let bodyobject = {
            UserId: JSON.parse(localStorage.getItem("user")).Id,
        }
        let Bearertoken;
        if (JSON.parse(localStorage.getItem("user")) != null) {
            Bearertoken = "Bearer " + JSON.parse(localStorage.getItem("user")).access_token;
        }

        const headers = {
            'Authorization': Bearertoken,
            'Content-Type': 'application/json' // Adjust content type if needed
        };

        const response = await axios.post("enterprenuer/chatlist", bodyobject, { headers });
        if (response.status == 200) {
            setChatlistdetail(response.data.response);
            if (response.data.response.length > 0) {
                setChatUsername(response.data.response[0].FullName);
                Chatmessagesapi(response.data.response[0].senderId == user.Id ? response.data.response[0].receiverId : response.data.response[0].senderId)
            }
        }
    };

    const Chatmessagesapi = async (e) => {
        setreceiverId(e);
        let bodyobject = {
            senderId: JSON.parse(localStorage.getItem("user")).Id,
            receiverId: e
        }
        let Bearertoken;
        if (JSON.parse(localStorage.getItem("user")) != null) {
            Bearertoken = "Bearer " + JSON.parse(localStorage.getItem("user")).access_token;
        }

        const headers = {
            'Authorization': Bearertoken,
            'Content-Type': 'application/json' // Adjust content type if needed
        };

        const response = await axios.post("enterprenuer/chatmessages", bodyobject, { headers });
        if (response.status == 200) {
            setChatmessages(response.data.response);
            setTimeout(() =>
                scrollToBottom(), 100);
        }
    }

    const handlesend = () => {
        if (inputmessage != "" && inputmessage != null) {
            Sendmessage();
            setinputmessage("");
        }
    }
    const Sendmessage = async (data) => {
        let bodyobject = {
            senderId: JSON.parse(localStorage.getItem("user")).Id,
            receiverId: receiverId,
            message: inputmessage,
            Id: null
        }
        let Bearertoken;
        if (JSON.parse(localStorage.getItem("user")) != null) {
            Bearertoken = "Bearer " + JSON.parse(localStorage.getItem("user")).access_token;
        }

        const headers = {
            'Authorization': Bearertoken,
            'Content-Type': 'application/json' // Adjust content type if needed
        };

        const response = await axios.post("enterprenuer/sendmessage", bodyobject, { headers });
        if (response.status == 200) {
            ChatlistGet();
        }
    }
    useEffect(() => {
        ChatlistGet();
        setTimeout(() =>
            scrollToBottom(), 100);
    }, [])

    if (Chatlistdetail == null) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className='container-fluid' style={{ background: '#F6F7F6' }}>
                <div className='row d-flex justify-content-center align-items-start'>
                    <h3 class="mb-3 mt-3 text-capitalize text-center">Chat</h3>
                    <div className='col-lg-10 mb-2' style={{ background: '#ffffff' }}>
                        <Box sx={{
                            maxHeight: "70vh",
                            minHeight: "70vh",
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
                            {
                                Chatlistdetail.length > 0 ?
                                    <>
                                        <div className='col-4 p-2' style={{ border: '1px solid gray', height: '66vh', maxHeight: '66vh', overflowY: 'scroll' }}>
                                            <small style={{ fontSize: '14px', marginLeft: '3px' }}>Chat List</small>
                                            <hr />
                                            <div className='d-flex flex-column justify-content-center align-items-start w-100'>
                                                {
                                                    Chatlistdetail &&
                                                    Chatlistdetail.map((element) => (
                                                        <>
                                                            <div onClick={() => {
                                                                Chatmessagesapi(element.senderId == user.Id ? element.receiverId : element.senderId);
                                                                setChatUsername(element.FullName)
                                                            }}
                                                                className='d-flex align-items-center ps-2 pb-1 pt-1 w-100' style={{ borderBottom: '1px solid whitesmoke', cursor: "pointer" }}>
                                                                <Avatar alt={element.FullName} src="/broken-image.jpg" />
                                                                <small style={{ fontSize: '14px', marginLeft: '5px' }}>{element.FullName}</small>
                                                            </div>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className='col-8' style={{ border: '1px solid gray', height: '66vh', maxHeight: '66vh', position: 'relative' }}>
                                            <div className='d-flex align-items-center ps-2 pb-1 pt-2' style={{ borderBottom: '1px solid #DBDBDB', position: 'sticky', top: '0', zIndex: '9999', background: 'white' }}>
                                                <Avatar alt={ChatUsername} src="/broken-image.jpg" />
                                                <small className='text-capitalize' style={{ fontSize: '14px', marginLeft: '5px' }}>{ChatUsername}</small>
                                            </div>
                                            <div ref={messagesEndRef} className='d-flex flex-column-reverse justify-content-start align-items-end ps-3 pt-3 pe-3' style={{ height: '71%', position: 'relative', overflowY: 'scroll' }}>
                                                {
                                                    Chatmessages &&
                                                    Chatmessages.map((element) => (
                                                        <p
                                                            className={
                                                                element.senderId == user.Id ?
                                                                    "Chatbox_input_container_p align-self-end" :
                                                                    "Chatbox_input_container_p align-self-start"}>
                                                            {element.message}
                                                            <small>{moment(element.createdAt).format('DD/MM/YYYY hh:mmA')}</small>
                                                        </p>
                                                    ))
                                                }

                                            </div>
                                            <div className='Chatbox_input_container'>
                                                <textarea value={inputmessage} onChange={(e) => setinputmessage(e.target.value)} type='text' className='col-8' />
                                                <button onClick={handlesend} className="btn btn-sm btn-lighter" type="button">Send</button>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center align-items-center h-100'>
                                                <h1>Chat List Empty</h1>
                                            </div>
                                        </div>
                                    </>
                            }

                            {/* 
                            <div className='d-flex justify-content-evenly align-items-center'>
                                    <div className='d-flex align-items-center'>
                                        <Avatar alt={"data.UserName"} src="/broken-image.jpg" />
                                        <small style={{ fontSize: '14px', marginLeft: '3px' }}>dataUserName</small>
                                    </div>
                                    <div className='d-flex justify-content-evenly align-items-center'>
                                        <button className='buttoncustom'>follow</button>
                                    </div>
                                </div> */}
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}
