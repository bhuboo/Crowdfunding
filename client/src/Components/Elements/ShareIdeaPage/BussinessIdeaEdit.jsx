import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Download, DownloadRounded, DownloadingRounded } from '@mui/icons-material';
import { BussinessIdeaDownloadFileGET, BussinessIdeaPostGet, BussinessIdeaUpdate } from '../../../AxiosCallfunctions/Innovator/Sharedpage';
import { Field, Form, Formik } from 'formik';
import { bussinessIdeaSchema } from '../../../FormSchema/useformikschema';
import PaymentSucess from '../../../alertmessage/PaymentSucess';

export default function BussinessIdeaEdit({ ModalViewClose, Id, api }) {
    const [layout, setLayout] = React.useState('fullscreen');
    const [Details, setDetails] = React.useState(null);
    const [formdata, setformdata] = React.useState(null);
    const [formdocument, setformdocument] = React.useState([]);

    const handleChangeFile = (e) => {
        var reader = new FileReader();
        var file = e.currentTarget.files[0];
        var Id = e.currentTarget.id;
        var Idname = e.currentTarget.name;
        const partsId = Id.split('_');
        let image;
        reader.onload = function (upload) {
            image = upload.target.result;
            let Documentfile = {
                id: Idname,
                DocumentType: partsId[1],
                Documentfield: partsId[2],
                ContentBase64: image,
            }
            setformdata((prev) => ({ ...prev, bussinessIdeaDocument: [...prev.bussinessIdeaDocument, Documentfile] }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmitform = async (e) => {
        let databody = {
            id: e.id,
            UserId: 0,
            BussinessName: e.BussinessName,
            BussinessType: e.BussinessType,
            InitialInvestment: e.InitialInvestment,
            Abstract: e.Abstract,
            BussinessIdeaDes: e.BussinessIdeaDes,
            bussinessIdeaDocument: formdata.bussinessIdeaDocument
        };
        console.log(databody)

        const res = await BussinessIdeaUpdate(databody);
        if (res.status == 200) {
            const Paymenttitle = "Bussiness Idea";
            const Paymenttext = res.data.message;
            const Paymenticon = "success";
            PaymentSucess(Paymenttitle, Paymenttext, Paymenticon);
            api();
            setformdata({
                BussinessName: "",
                BussinessType: "",
                InitialInvestment: "",
                Abstract: "",
                BussinessIdeaDes: "",
                bussinessIdeaDocument: []
            })

            ModalViewClose(false);
        }
    }

    const intitialandbussinessIdeaapi2 = () => {
        let objectbody = {
            UserId: "",
            Id: Id
        }
        BussinessIdeaPostGet(objectbody)
            .then((result) => {
                if (result.status == 200) {
                    const response = result.data.response;
                    if (response) {
                        setDetails(response);
                        setformdata({
                            id: response.id,
                            BussinessName: response.BussinessName,
                            BussinessType: response.BussinessType,
                            InitialInvestment: response.InitialInvestment,
                            Abstract: response.Abstract,
                            BussinessIdeaDes: response.BussinessIdeaDes,
                            bussinessIdeaDocument: []
                        })
                        setformdocument(response.BussinessIdeaDocument);
                    }
                }
            });

    }
    React.useEffect(() => {
        intitialandbussinessIdeaapi2();
    }, [])

    if (formdata === null) {
        // Initial state is not yet set, you can render a loading indicator or placeholder
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            {/* <Stack direction="row" spacing={1}>
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => {
                        setLayout('center');
                    }}
                >
                    Center
                </Button>
                <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => {
                        setLayout('fullscreen');
                    }}
                >
                    Full screen
                </Button>
            </Stack> */}
            {
                Details != null &&
                <Modal open={!!layout} onClose={() => ModalViewClose(false)}>
                    <ModalDialog layout={layout}>
                        <ModalClose />
                        <DialogTitle>
                            <h3 className="text-primary text-start text-uppercase fw-bold m-0">
                                Bussiness Ideas Details Of <h4 className='text-center d-inline-block'>{Details.BussinessName}</h4> Edit
                            </h3>
                        </DialogTitle>
                        <DialogContent>
                            <div className="container-fluid mb-5">
                                <div className={"row justify-content-center align-items-center"}>
                                    <div className="col-lg-10">
                                        <div className="shadow rounded p-5 bg-white">
                                            <div className="row">
                                                {/* <div className="col-12 mb-4">
                                            <h4 className='text-center'>Create Bussiness Idea</h4>
                                        </div> */}
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
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Bussiness Name</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control shadow-none"
                                                                            id="BussinessName"
                                                                            name="BussinessName"
                                                                        // value={Details.BussinessName}
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
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Bussiness Type</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control shadow-none"
                                                                            id="BussinessType"
                                                                            name="BussinessType"
                                                                        // value={Details.BussinessType}
                                                                        // onChange={handleChange}
                                                                        />
                                                                        {errors.BussinessType && touched.BussinessType ? (
                                                                            <div className='d-flex justify-content-center align-content-center'>
                                                                                <div className='text-center useformik-error'>{errors.BussinessType}</div>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="form-group mb-4 pb-2">
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label">initial investment</label>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control shadow-none"
                                                                            id="InitialInvestment"
                                                                            name="InitialInvestment"
                                                                        // value={Details.InitialInvestment}
                                                                        // onChange={handleChange}
                                                                        />
                                                                        {errors.InitialInvestment && touched.InitialInvestment ? (
                                                                            <div className='d-flex justify-content-center align-content-center'>
                                                                                <div className='text-center useformik-error'>{errors.InitialInvestment}</div>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="form-group mb-4 pb-2">
                                                                        <label htmlFor="Abstract" className="form-label">Abstract</label>
                                                                        <Field
                                                                            as="textarea"
                                                                            className="form-control shadow-none"
                                                                            id="Abstract"
                                                                            name="Abstract"
                                                                            rows="3"
                                                                        // value={Details.Abstract}
                                                                        // onChange={handleChange}
                                                                        ></Field>
                                                                        {errors.Abstract && touched.Abstract ? (
                                                                            <div className='d-flex justify-content-center align-content-center'>
                                                                                <div className='text-center useformik-error'>{errors.Abstract}</div>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className="form-group mb-4 pb-2">
                                                                        <label htmlFor="BussinessIdeaDes" className="form-label">Explain Your Bussiness Idea</label>
                                                                        <Field
                                                                            as="textarea"
                                                                            className="form-control shadow-none"
                                                                            id="BussinessIdeaDes"
                                                                            name="BussinessIdeaDes"
                                                                            rows="3"
                                                                        // value={Details.BussinessIdeaDes}
                                                                        // onChange={handleChange}
                                                                        ></Field>
                                                                        {errors.BussinessIdeaDes && touched.BussinessIdeaDes ? (
                                                                            <div className='d-flex justify-content-center align-content-center'>
                                                                                <div className='text-center useformik-error'>{errors.BussinessIdeaDes}</div>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                    <div className='row'>
                                                                        {
                                                                            formdocument.length > 0 &&
                                                                            formdocument.map((Element) => (
                                                                                <>
                                                                                    <div className='col-6'>
                                                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Document {Element.Documentfield}</label>
                                                                                        <div className="form-group mb-4 pb-2">
                                                                                            <input
                                                                                                type='file'
                                                                                                accept={Element.DocumentType == 1 ? ".pdf,.docx" : ".ppt, .pptx"}
                                                                                                style={{ height: "auto" }}
                                                                                                className="form-control shadow-none"
                                                                                                id={"Document_" + Element.DocumentType + "_" + Element.Documentfield}
                                                                                                name={Element.id}
                                                                                                onChange={handleChangeFile}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </>
                                                                            ))
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
                                </div>
                            </div>
                            {/* <div>
                            This is a <code>{layout}</code> modal dialog. Press <code>esc</code> to
                            close it.
                        </div> */}
                        </DialogContent>
                    </ModalDialog>
                </Modal>
            }
        </React.Fragment>
    );
}