import React, { useState } from 'react'
import styles from '../../loginreg/loginreg.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { forgetpassword } from '../../../AxiosCallfunctions/enterprenour/bussinessIdeas.js';
export default function Forgetpasswordemail() {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const handlesubmit = async () => {
        if (email.length > 0) {
            try {
                let response = await forgetpassword(email);
                console.log(response);
                if (response.status == 200) {
                    localStorage.setItem("otpemail", response.data.Email)
                    navigate("/verifyotp");
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
            <div className='d-flex justify-content-center align-content-center col-12'>
                <div className='col-6'>
                    <div className={styles['login-container-section-one-sub']}>
                        <div className={styles['forgetpasswordcontainer']}>
                            <h6>FORGOT PASSWORD</h6>
                            <p>Provide your
                                <strong className='ps-1 pe-1 text-decoration-underline fw-bolder'>Email Id</strong>
                                for which you want to reset your password
                            </p>
                            <div className='col-10 pt-2'>
                                <label>
                                    Registered Email Id :
                                </label>
                                <br />
                                <input
                                    type='text'
                                    placeholder='Enter your Email Id'
                                    id="emailId"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)} />
                                {/* <Link to={'/verifyotp'} > */}
                                <button onClick={() => handlesubmit()} className={styles['login-container-section-one-sub-button']} type='button'>Send</button>
                                {/* </Link> */}

                                <button className={styles['login-container-section-one-sub-button'] + '  ms-2'} type='button' onClick={() => navigate('/login')}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
