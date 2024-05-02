import React, { useEffect, useState } from 'react'
import styles from '../../loginreg/loginreg.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgetpasswordChange } from '../../../AxiosCallfunctions/enterprenour/bussinessIdeas';
import { ToastContainer, toast } from 'react-toastify';
export default function Newpassword() {
    const navigate = useNavigate();
    const [password, setpassword] = useState("");
    const [otpemail, setotpemail] = useState(localStorage.getItem('otpemail'));
    const handlesubmit = async () => {
        if (password.length > 0) {
            try {
                let response = await forgetpasswordChange(password, otpemail);
                console.log(response);
                if (response.status == 200) {
                    setpassword('');
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setInterval(() => {
                        console.log("dbbbdcbdskj")
                        navigate('/login')
                    }, 3000)
                }
                // Optionally, you can display a success message or redirect the user
            } catch (error) {
                console.error('Error occurred:', error);
                // Optionally, you can display an error message to the user
            }
        } else {
            // Optionally, you can display a message prompting the user to enter their email
            console.warn('Please enter your email address.');
        }
    };

    return (
        <div className={styles['login-container']}>
            <ToastContainer transition:Slide />
            <div className='d-flex justify-content-center align-content-center col-12'>
                <div className='col-6'>
                    <div className={styles['login-container-section-one-sub']}>
                        <div className={styles['forgetpasswordcontainer']}>
                            <h6>CHANGE PASSWORD</h6>
                            {/* <p>OTP send to to your
                                <br />
                                <strong className='ps-1 pe-1 text-decoration-underline fw-bolder'>Email Id :</strong>
                                <strong className='ps-1 pe-1 text-decoration-underline fw-bolder'>{otpemail}</strong>
                                Please check it.
                            </p> */}
                            <div className='col-12 pt-2'>
                                <label>
                                    New Password :
                                </label>
                                <br />
                                <input
                                    type='password'
                                    placeholder='Enter your New Password'
                                    id="emailId"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)} />
                                <label>
                                    Confirm Password :
                                </label>
                                <br />
                                <input
                                    type='password'
                                    placeholder='Enter your Confirm Password'
                                // id="emailId"
                                // value={otp}
                                // onChange={(e) => setotp(e.target.value)} 
                                />
                                {/* <Link to={'/verifyotp'} > */}
                                <button onClick={() => handlesubmit()} className={styles['login-container-section-one-sub-button']} type='button'>Submit</button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
