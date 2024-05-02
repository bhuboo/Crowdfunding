import React, { useContext, useEffect, useState } from 'react'
import { Await, Link, useNavigate, useParams } from 'react-router-dom'
import PaymentSucess from '../../../alertmessage/PaymentSucess';
import PremiumPayment from '../../../Payments/PremiumPayment';
import { AuthContext } from '../../../context/AuthContext';

import TableElementCustom from '../../Elements/ShareIdeaPage/ShareIdeaTableElement.jsx'
import { BussinessIdeaCreate, Initialapicall, PaymentUpdateStatus, BussinessIdeaDelete } from '../../../AxiosCallfunctions/Innovator/Sharedpage.js';
import { ArrowBack } from '@mui/icons-material';
import { Button, Input } from '@mui/material';
import CustomizedPaymentModal from '../../Elements/Payment/PaymentModal.jsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { bussinessIdeaSchema } from '../../../FormSchema/useformikschema.js';

export default function Shareideascode() {

    const { user } = useContext(AuthContext);
    const { booleanParam, Id } = useParams();
    const navigate = useNavigate();

    const [formdata, setformdata] = useState({
        BussinessName: "",
        BussinessType: "",
        InitialInvestment: "",
        Abstract: "",
        BussinessIdeaDes: "",
        bussinessIdeaDocument: []
    });
    const [open, setOpen] = React.useState(false);
    const [premium, setpremium] = useState(false);
    const [premiumDetail, setpremiumDetail] = useState(null);
    const [InitialState, setInitialState] = useState(null);
    const [Ideascount, setIdeasCount] = useState(false);

    const paymentalertsuccess = () => {
        PaymentUpdateStatus(Id);
        const Paymenttitle = "Premium Payment";
        const Paymenttext = "Payment successfully";
        const Paymenticon = "success";
        PaymentSucess(Paymenttitle, Paymenttext, Paymenticon);
    }

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitform = async (e) => {
        let databody = {
            UserId: 0,
            BussinessName: e.BussinessName,
            BussinessType: e.BussinessType,
            InitialInvestment: e.InitialInvestment,
            Abstract: e.Abstract,
            BussinessIdeaDes: e.BussinessIdeaDes,
            bussinessIdeaDocument: formdata.bussinessIdeaDocument
        };

        const res = await BussinessIdeaCreate(databody);
        if (res.status == 200) {
            const Paymenttitle = "Bussiness Idea";
            const Paymenttext = res.data.message;
            const Paymenticon = "success";
            PaymentSucess(Paymenttitle, Paymenttext, Paymenticon);
            intitialandbussinessIdeaapi();
            setformdata({
                BussinessName: "",
                BussinessType: "",
                InitialInvestment: "",
                Abstract: "",
                BussinessIdeaDes: "",
                bussinessIdeaDocument: []
            })
            setIdeasCount(true);
        }
    }

    const handleChangeFile = (e) => {
        var reader = new FileReader();
        var file = e.currentTarget.files[0];
        var Id = e.currentTarget.id;
        const partsId = Id.split('_');
        let image;
        reader.onload = function (upload) {
            image = upload.target.result;
            let Documentfile = {
                DocumentType: partsId[1],
                Documentfield: partsId[2],
                ContentBase64: image,
            }
            setformdata((prev) => ({ ...prev, bussinessIdeaDocument: [...prev.bussinessIdeaDocument, Documentfile] }));
        };
        reader.readAsDataURL(file);
    };


    const handleDelete = async (e) => {
        var response = await BussinessIdeaDelete(e);
        if (response.status == 200) {
            intitialandbussinessIdeaapi();
        }
    };

    const intitialandbussinessIdeaapi = () => {
        Initialapicall()
            .then((result) => {
                if (result.status == 200) {
                    const response = result.data;
                    if (response.bussinessIdeaCount > 0) {
                        setIdeasCount(true);
                    }
                    if (response.premiumSubcription) {
                        setpremium(true);
                        setpremiumDetail(response.premiumSubcriptionDetail);
                    }
                    setInitialState(response)
                }
            });

    }
    useEffect(() => {
        intitialandbussinessIdeaapi();
        if (booleanParam === 'true') {
            paymentalertsuccess();
            setTimeout(() => {
                navigate('/shareideas');
            }, 2000);
        }
    }, [])

    if (InitialState === null) {
        // Initial state is not yet set, you can render a loading indicator or placeholder
        return <div>Loading...</div>;
    }

    return (
        <>
            <CustomizedPaymentModal open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
            {/* <section className="page-header bg-tertiary"> */}
            <div className="container">
                <div className="row mt-2">
                    <div className="col-8 mx-auto text-center">
                        <h2 className="mb-3 text-capitalize">BUSSINESS IDEAS</h2>
                        <ul className="list-inline breadcrumbs text-capitalize" style={{ fontWeight: 500 }}>
                            <li className="list-inline-item"><Link to={"/"} >Home</Link>
                            </li>
                            <li className="list-inline-item">/ &nbsp; <Link to={"/shareideas"} href="contact.html">Share Ideas</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* </section > */}

            {
                <>
                    {/* <section className="section"> */}
                    <div className="container mb-5">
                        <div className={Ideascount ? "row justify-content-between align-items-center" : "row justify-content-center align-items-center"}>
                            <div className="col-lg-10">
                                <div className="section-title text-center">
                                    {
                                        Ideascount ?
                                            <>
                                                <h3 className="text-primary text-start text-uppercase fw-bold mb-3">
                                                    List Of Bussiness Ideas :
                                                </h3>
                                            </>
                                            :
                                            <>
                                                <p className="text-primary text-uppercase fw-bold mb-3">
                                                    Share Your Ideas With us
                                                </p>
                                            </>
                                    }
                                </div>
                                {
                                    !Ideascount &&
                                    <Button onClick={() => setIdeasCount(!Ideascount)} className="btn btn-primary ml-2 mb-2" style={{ maxWidth: "100%", color: 'white', background: '#51B56D' }} type="submit"><ArrowBack />List Of BUSSINESS IDEAS</Button>
                                }
                            </div>
                            {
                                Ideascount
                                    ?
                                    <>
                                        <div className='row justify-content-end align-items-center'>
                                            <Button onClick={() => setIdeasCount(!Ideascount)} className="btn btn-sm btn-primary mb-1" style={{ maxWidth: "140px", color: 'white', background: '#51B56D' }} type="submit">Create</Button>
                                        </div>
                                        <TableElementCustom data={InitialState.bussinessIdea} api={intitialandbussinessIdeaapi} handleDelete={handleDelete} />
                                    </>
                                    :
                                    <>
                                        <div className="col-lg-10">
                                            <div className="shadow rounded p-5 bg-white">
                                                <div className="row">
                                                    <div className="col-12 mb-4">
                                                        <h4 className='text-center'>Create Bussiness Idea</h4>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="contact-form">
                                                            <Formik
                                                                initialValues={formdata}
                                                                validationSchema={bussinessIdeaSchema}
                                                                onSubmit={fields => {
                                                                    handleSubmitform(fields)
                                                                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                                                                }}
                                                            >
                                                                {({ field, errors, touched }) => (
                                                                    <Form>
                                                                        <div className="form-group mb-4 pb-2">
                                                                            <label for="exampleFormControlInput1" className="form-label">Bussiness Name</label>
                                                                            <Field
                                                                                type="text"
                                                                                className="form-control shadow-none"
                                                                                id="BussinessName"
                                                                                name="BussinessName"
                                                                            // onChangeText={handleChange(field)}
                                                                            // onChange={handleChange(field)}
                                                                            />
                                                                            {errors.BussinessName && touched.BussinessName ? (
                                                                                <div className='d-flex justify-content-center align-content-center'>
                                                                                    <div className='text-center useformik-error'>{errors.BussinessName}</div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="form-group mb-4 pb-2">
                                                                            <label for="exampleFormControlInput1" className="form-label">Bussiness Type</label>
                                                                            <Field
                                                                                type="text"
                                                                                className="form-control shadow-none"
                                                                                id="BussinessType"
                                                                                name="BussinessType"
                                                                            // onChange={handleChange}
                                                                            />
                                                                            {errors.BussinessType && touched.BussinessType ? (
                                                                                <div className='d-flex justify-content-center align-content-center'>
                                                                                    <div className='text-center useformik-error'>{errors.BussinessType}</div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="form-group mb-4 pb-2">
                                                                            <label for="exampleFormControlInput1" className="form-label">initial investment</label>
                                                                            <Field
                                                                                type="text"
                                                                                className="form-control shadow-none"
                                                                                id="InitialInvestment"
                                                                                name="InitialInvestment"
                                                                            // onChange={handleChange}
                                                                            />
                                                                            {errors.InitialInvestment && touched.InitialInvestment ? (
                                                                                <div className='d-flex justify-content-center align-content-center'>
                                                                                    <div className='text-center useformik-error'>{errors.InitialInvestment}</div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="form-group mb-4 pb-2">
                                                                            <label for="Abstract" className="form-label">Abstract</label>
                                                                            <Field
                                                                                as="textarea"
                                                                                className="form-control shadow-none"
                                                                                id="Abstract"
                                                                                name="Abstract"
                                                                                rows="3"
                                                                            // onChange={handleChange}
                                                                            ></Field>
                                                                            {errors.Abstract && touched.Abstract ? (
                                                                                <div className='d-flex justify-content-center align-content-center'>
                                                                                    <div className='text-center useformik-error'>{errors.Abstract}</div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                        <div className="form-group mb-4 pb-2">
                                                                            <label for="BussinessIdeaDes" className="form-label">Explain Your Bussiness Idea</label>
                                                                            <Field
                                                                                as="textarea"
                                                                                className="form-control shadow-none"
                                                                                id="BussinessIdeaDes"
                                                                                name="BussinessIdeaDes"
                                                                                rows="3"
                                                                            // onChange={handleChange}
                                                                            ></Field>
                                                                            {errors.BussinessIdeaDes && touched.BussinessIdeaDes ? (
                                                                                <div className='d-flex justify-content-center align-content-center'>
                                                                                    <div className='text-center useformik-error'>{errors.BussinessIdeaDes}</div>
                                                                                </div>
                                                                            ) : null}
                                                                        </div>

                                                                        {
                                                                            premium &&
                                                                            <>

                                                                                <div className='row'>
                                                                                    <div className='col-6'>
                                                                                        <label for="exampleFormControlTextarea1" className="form-label">Document 1</label>
                                                                                        <div className="form-group mb-4 pb-2">
                                                                                            <input
                                                                                                type='file'
                                                                                                accept=".pdf,.docx"
                                                                                                style={{ height: "auto" }}
                                                                                                className="form-control shadow-none"
                                                                                                id="Document_1_1"
                                                                                                onChange={handleChangeFile}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-6'>
                                                                                        <label for="exampleFormControlTextarea1" className="form-label">Document 2</label>
                                                                                        <div className="form-group mb-4 pb-2">
                                                                                            <input
                                                                                                type='file'
                                                                                                accept=".pdf,.docx"
                                                                                                style={{ height: "auto" }}
                                                                                                className="form-control shadow-none"
                                                                                                id="Document_1_2"
                                                                                                onChange={handleChangeFile}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='row'>
                                                                                    {
                                                                                        (premiumDetail && premiumDetail.SubcriptionType == 2 || premiumDetail && premiumDetail.SubcriptionType == 3) &&
                                                                                        <div className='col-6'>
                                                                                            <label for="exampleFormControlTextarea1" className="form-label">Video File</label>
                                                                                            <div className="form-group mb-4 pb-2">
                                                                                                <input
                                                                                                    type='file'
                                                                                                    accept="video/*"
                                                                                                    style={{ height: "auto" }}
                                                                                                    className="form-control shadow-none"
                                                                                                    id="Document_2_3"
                                                                                                // onChange={handleChangeFile}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                    {
                                                                                        premiumDetail && premiumDetail.SubcriptionType == 3 &&
                                                                                        <div className='col-6'>
                                                                                            <label for="exampleFormControlTextarea1" className="form-label">PPT File</label>
                                                                                            <div className="form-group mb-4 pb-2">
                                                                                                <input
                                                                                                    type='file'
                                                                                                    accept=".ppt, .pptx"
                                                                                                    style={{ height: "auto" }}
                                                                                                    className="form-control shadow-none"
                                                                                                    id="Document_3_4"
                                                                                                    onChange={handleChangeFile} />
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </>
                                                                        }
                                                                        <div className='d-flex justify-content-end mb-2'>
                                                                            {
                                                                                premium ?
                                                                                    ""
                                                                                    :
                                                                                    <button onClick={handleClickOpen} className="btn btn-sm btn-dark" type="submit">Try Premium</button>
                                                                            }
                                                                        </div>
                                                                        <button className="btn btn-primary w-10" type="submit">Post</button>
                                                                    </Form>
                                                                )}
                                                            </Formik>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    {/* </section > */}
                </>
            }
        </>
    )
}
