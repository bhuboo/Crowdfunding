import React, { useEffect, useState } from 'react'
import styles from '../../loginreg/loginreg.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgetpassword, forgetpasswordOTP } from '../../../AxiosCallfunctions/enterprenour/bussinessIdeas';
import { ToastContainer, toast } from 'react-toastify';
export default function VerifyOtp() {
    const navigate = useNavigate();
    const [otp, setotp] = useState("");
    const [resendOTP, setresendOTP] = useState(60);
    const [otpemail, setotpemail] = useState(localStorage.getItem('otpemail'));
    const handlesubmit = async () => {
        setresendOTP(60);
        if (otpemail.length > 0) {
            try {
                let response = await forgetpassword(otpemail);
                console.log(response);
                if (response.status == 200) {
                    setotp("");
                    toast.success('OTP send successfully.', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
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

    const handleOTPsubmit = async () => {
        if (otp.length > 0) {
            try {
                let response = await forgetpasswordOTP(otp, otpemail);
                console.log(response.status);
                if (response.status == 200) {
                    localStorage.setItem("otpemail", response.data.Email)
                    navigate("/newpassword");
                }
                if (response.status == 201) {
                    setotp("");
                    toast.warn(response.data.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
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
    useEffect(() => {
        if (resendOTP != 0) {
            setTimeout(() => {
                setresendOTP(resendOTP - 1);
            }, 1000)
        }
    })
    return (
        <div className={styles['login-container']}>
            <ToastContainer transition:Slide />
            <div className='d-flex justify-content-center align-content-center col-12'>
                <div className='col-6'>
                    <div className={styles['login-container-section-one-sub']}>
                        <div className={styles['forgetpasswordcontainer']}>
                            <h6>FORGOT PASSWORD OTP VERIFICATION</h6>
                            <p>OTP send to to your
                                <br />
                                <strong className='ps-1 pe-1 text-decoration-underline fw-bolder'>Email Id :</strong>
                                <strong className='ps-1 pe-1 text-decoration-underline fw-bolder'>{otpemail}</strong>
                                Please check it.
                            </p>
                            <div className='col-10 pt-2'>
                                <label>
                                    OTP NUM :
                                </label>
                                <br />
                                <input
                                    type='text'
                                    placeholder='Enter your OTP'
                                    id="emailId"
                                    value={otp}
                                    onChange={(e) => setotp(e.target.value)} />
                                {/* <Link to={'/verifyotp'} > */}
                                <button onClick={() => handleOTPsubmit()} className={styles['login-container-section-one-sub-button']} type='button'>Send</button>
                                {/* </Link> */}
                                {
                                    resendOTP == 0 ?
                                        <button className={styles['login-container-section-one-sub-button'] + '  ms-2'} type='button' onClick={() => handlesubmit()}>Resend OTP</button>
                                        :
                                        <button className={styles['login-container-section-one-sub-button'] + '  ms-2'} type='button'>{resendOTP}</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
