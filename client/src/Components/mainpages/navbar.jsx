import React, { useContext } from 'react'
import logo from '../../Template/images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { Avatar, Chip, ChipDelete } from '@mui/joy';
export default function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const location = useLocation();

    const UserLogout = () => {
        // localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    }
    console.log(user);
    return (
        <header className="navigation bg-tertiary">
            <nav className="navbar navbar-expand-xl navbar-light text-center py-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        <img loading="prelaod" decoding="async" className="img-fluid" width="160" src={logo} alt="Wallet" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            {
                                location.pathname != "/Ideas" && user.UserType == 1 &&
                                <li className="nav-item">
                                    <Link to={"/shareideas"} className="nav-link" href="index.html">Share Ideas</Link>
                                </li>
                            }
                            {
                                location.pathname != "/bussinessIdeas" && user.UserType == 2 &&
                                <li className="nav-item">
                                    <Link to={"/bussinessIdeas"} className="nav-link" href="index.html">Bussiness Ideas</Link>
                                </li>
                            }
                            {
                                location.pathname != "/" &&
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link" href="index.html">Home</Link>
                                </li>
                            }
                            {
                                location.pathname != "/aboutus" &&
                                <li className="nav-item "> <Link to={"/aboutus"} className="nav-link" href="about.html">About</Link>
                                </li>
                            }
                            {/* <li className="nav-item "> <a className="nav-link" href="how-it-works.html">How It Works</a>
                            </li>
                            <li className="nav-item "> <a className="nav-link" href="services.html">Services</a>
                            </li> */}
                            {
                                location.pathname != "/contactus" &&
                                <li className="nav-item ">
                                    <Link to={"/contactus"} className="nav-link" href="contact.html">Contact</Link>
                                </li>
                            }
                            {
                                location.pathname != "/Chat" &&
                                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Connection's</a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {/* <li className="nav-item ">
                                        <Link to={"/findinnovator"} className="dropdown-item" href="contact.html">Find Innovator</Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Link to={"/Connectinnovator"} className="dropdown-item" href="contact.html">Connected Innovator</Link>
                                    </li> */}
                                        <li className="nav-item ">
                                            <Link to={"/Chat"} className="dropdown-item" href="contact.html">Chat</Link>
                                        </li>
                                    </ul>
                                </li>
                            }
                        </ul>
                        {/* <a href="#!" className="btn btn-outline-primary">Log In</a>
                        <a href="#!" className="btn btn-primary ms-2 ms-lg-3">Sign Up</a> */}
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                        <div className='profile-style'>
                            <Avatar alt={user.FullName} src="/broken-image.jpg" />
                            <small>{user.FullName}</small>
                        </div>
                        <button onClick={() => UserLogout()} className="btn btn-primary ms-2 ms-lg-3 p-2"><Logout /> Logout</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
