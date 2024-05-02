import React from 'react'
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";

import styles from './loginreg.module.css';

import Login_Art from '../../assets/Loginpage.jpg'

export default function loginreg() {

    const [method, setmethod] = useState(true);
    const [credentials, setCredentials] = useState({
        Fullname: "",
        Username: "",
        Password: "",
        UserType: "",
    });


    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("auth/login", credentials);
            if (res) {
                console.log(res.data)
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.userdetails });

                navigate("/");
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: { message: "You are not allowed!" },
                });
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGNUP_START" });
        try {
            const res = await axios.post("auth/register", credentials);
            if (res.status == 201) {
                dispatch({ type: "SIGNUP_SUCCESS", payload: res.data.message });

                setmethod(!method);
                setCredentials({
                    Fullname: "",
                    Username: "",
                    Password: "",
                    UserType: "",
                })
            } else {
                dispatch({
                    type: "SIGNUP_FAILURE",
                    payload: { message: res.data.message },
                });
            }
        } catch (err) {
            dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
        }
    }

    return (
        <>
            <div className={styles['login-container']}>
                <div className={styles['login-container-section-one']}>
                    <div className={method ? styles['login-container-section-one-sub'] : styles['register-container-section-one-sub']}>
                        {
                            method ?
                                <h3>Welcome Back 👋</h3>
                                :
                                <h5>Sign Up👋</h5>
                        }
                        {/* <p>Today is a new day. It's your day. You shape it.
                            Sign in to start managing your projects.</p> */}
                        {
                            !method &&
                            <>
                                <div className={styles['login-container-section-one-sub-one']}>
                                    <label>Full Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter your Full Name'
                                        id="Fullname"
                                        value={credentials.Fullname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        }
                        <div className={styles['login-container-section-one-sub-one']}>
                            <label>Email</label>
                            <input
                                type='text'
                                placeholder='Enter your Username'
                                id="Username"
                                value={credentials.Username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles['login-container-section-one-sub-one']}>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder='Enter your Password'
                                id="Password"
                                value={credentials.Password}
                                onChange={handleChange}
                            />

                        </div>
                        {
                            !method &&
                            (
                                <div className={styles['register-container-section-one-sub-one']}>
                                    <label>UserType :</label>
                                    <span>Innovator</span>
                                    <input
                                        type='radio'
                                        id="UserType"
                                        name='UserType'
                                        value={1}
                                        onChange={handleChange}
                                    />
                                    <span>Entrepreneur</span>
                                    <input
                                        type='radio'
                                        id="UserType"
                                        name='UserType'
                                        value={2}
                                        onChange={handleChange}
                                    />
                                </div>
                            )
                        }
                        <button
                            className={styles['login-container-section-one-sub-button']}
                            disabled={loading}
                            onClick={method ? handleClick : handleRegister}
                        >{method ? "Sign in" : "Sign up"}</button>
                        {error
                            && <span>{error.message}</span>
                        }
                        {
                            method &&
                            <Link className={styles['login-container-section-one-sub-label-foget']} to={'/Fpemail'}
                                style={{ textAlign: 'end', height: 'auto', textDecoration: 'underline', width: '100%' }}>
                                Forgot Password?
                            </Link>
                        }
                        <label onClick={() => {
                            setmethod(!method);
                            setCredentials({
                                Fullname: "",
                                Username: "",
                                Password: "",
                                UserType: "",
                            })
                        }} className={styles['login-container-section-one-sub-label-foget']}>{method ? "Don't you have an account? Sign up" : "Already have an account? Sign in"}</label>
                    </div>
                </div>
                <div className={styles['login-container-section-two']}>
                    <img src={Login_Art} width={"80%"} height={"98%"} />
                </div>
            </div >
        </>
    )
}
