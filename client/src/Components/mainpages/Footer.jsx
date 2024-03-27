import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

export default function Footer() {
    const { user, dispatch } = useContext(AuthContext);
    const location = useLocation();
    return (
        <footer className="section-sm bg-tertiary">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-12 col-md-12 col-12 mb-2">
                        <div className="footer-widget w-100">
                            <ul className="customcssfooter navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-row justify-content-evenly align-items-center">
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
                            </ul>
                            {/* <a href="#!" className="btn btn-outline-primary">Log In</a>
                        <a href="#!" className="btn btn-primary ms-2 ms-lg-3">Sign Up</a> */}
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mt-5 text-center text-md-start">
                    <div className="col-lg-4">
                        <a href="index.html">
                            <img loading="prelaod" decoding="async" className="img-fluid" width="160" src="/src/Template/images/logo.png" alt="Wallet" />
                        </a>
                    </div>
                    <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                        <ul className="list-unstyled list-inline mb-0 text-lg-center">
                            <li className="list-inline-item me-4"><a className="text-black" href="privacy-policy.html">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item me-4"><a className="text-black" href="terms.html">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 text-md-end mt-4 mt-md-0">
                        <ul className="list-unstyled list-inline mb-0 social-icons">
                            <li className="list-inline-item me-3"><a title="Explorer Facebook Profile" className="text-black" href="https://facebook.com/"><i className="fab fa-facebook-f"></i></a>
                            </li>
                            <li className="list-inline-item me-3"><a title="Explorer Twitter Profile" className="text-black" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                            </li>
                            <li className="list-inline-item me-3"><a title="Explorer Instagram Profile" className="text-black" href="https://instagram.com/"><i className="fab fa-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
