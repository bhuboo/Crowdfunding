import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { Download, DownloadRounded, DownloadingRounded } from '@mui/icons-material';
import { BussinessIdeaDownloadFileGET, BussinessIdeaPostGet } from '../../../AxiosCallfunctions/Innovator/Sharedpage';

export default function BussinessIdeaView({ ModalViewClose, Id }) {
    const [layout, setLayout] = React.useState('fullscreen');
    const [Details, setDetails] = React.useState(null);

    const BussinessIdeaDownloadFile = async (e) => {
        let bodyobject = {
            Id: e,
            UserId: ""
        }

        const res = await BussinessIdeaDownloadFileGET(bodyobject)
        if (res.status == 200) {
            console.log(res.data.response)
            const link = document.createElement('a');
            link.href = res.data.response.ContentBase64;
            link.setAttribute('download', 'Document.pdf');

            // Hide the link
            link.style.display = 'none';

            // Append the link to the document body
            document.body.appendChild(link);

            // Click the link to trigger download
            link.click();

            // Remove the link from the document body
            document.body.removeChild(link);
        }

    }
    const intitialandbussinessIdeaapi = () => {
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
                    }
                }
            });

    }
    React.useEffect(() => {
        intitialandbussinessIdeaapi();
    }, [])

    if (Details === null) {
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
                                Bussiness Ideas Details Of :  <h4 className='text-center d-inline-block'>{Details.BussinessName}</h4>
                            </h3>
                        </DialogTitle>
                        <DialogContent>
                            <div className="container-fluid mb-5">
                                <div className={"row justify-content-center align-items-center"}>
                                    <div className="col-lg-12">
                                        <div className="col-lg-12">
                                            <div className="shadow rounded p-5 bg-white">
                                                <div className="row justify-content-center">
                                                    {/* <div className="col-12 mb-4">
                                                    <h4 className='text-center'>Create Bussiness Idea</h4>
                                                </div> */}
                                                    <div className="col-10 d-flex justify-content-between">
                                                        <div className='col-lg-4' style={{ marginRight: '12px' }}>
                                                            <div className="contact-form">
                                                                <div className="form-group mb-4 pb-2">
                                                                    <label for="exampleFormControlInput1" className="form-label">Bussiness Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control shadow-none"
                                                                        id="BussinessName"
                                                                        name="BussinessName"
                                                                        readOnly={true}
                                                                        value={Details.BussinessName}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4' style={{ marginRight: '12px' }}>
                                                            <div className="form-group mb-4 pb-2">
                                                                <label for="exampleFormControlInput1" className="form-label">Bussiness Type</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control shadow-none"
                                                                    id="BussinessType"
                                                                    name="BussinessType"
                                                                    readOnly={true}
                                                                    value={Details.BussinessType}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-4' style={{ marginRight: '12px' }}>
                                                            <div className="form-group mb-4 pb-2">
                                                                <label for="exampleFormControlInput1" className="form-label">initial investment</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control shadow-none"
                                                                    id="InitialInvestment"
                                                                    name="InitialInvestment"
                                                                    value={Details.InitialInvestment}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-10 d-flex justify-content-between">
                                                        <div className='col-lg-6' style={{ marginRight: '12px' }}>
                                                            <div className="form-group mb-4 pb-2">
                                                                <label for="Abstract" className="form-label">Abstract</label>
                                                                <textarea
                                                                    className="form-control shadow-none"
                                                                    id="Abstract"
                                                                    name="Abstract"
                                                                    rows="3"
                                                                    value={Details.Abstract}
                                                                    style={Details.BussinessIdeaDocument.length == 0 ? { minHeight: 280 } : { minHeight: 280 }}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <div className="form-group mb-4 pb-2 ">
                                                                <label for="BussinessIdeaDes" className="form-label">Explain Your Bussiness Idea</label>
                                                                <textarea
                                                                    className="form-control shadow-none"
                                                                    id="BussinessIdeaDes"
                                                                    name="BussinessIdeaDes"
                                                                    rows="3"
                                                                    style={Details.BussinessIdeaDocument.length == 0 ? { minHeight: 280 } : { minHeight: 280 }}
                                                                    value={Details.BussinessIdeaDes}
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*  Document division */}
                                                    <div className="col-10 d-flex justify-content-between flex-wrap">
                                                        {
                                                            Details.BussinessIdeaDocument.map((element, index) => (
                                                                <div className='col-lg-6' key={index}>
                                                                    <div className='d-flex justify-content-center w-100'>
                                                                        <div className="form-group mb-4 pb-2 w-100">
                                                                            <label htmlFor={`Document${index + 1}`} className="form-label">Document {index + 1}</label>
                                                                            <div
                                                                                className="form-control shadow-none"
                                                                                id={`Document${index + 1}`}
                                                                                name={`Document${index + 1}`}
                                                                            >
                                                                                <div className='d-flex justify-content-between align-items-center pl-2 pr-2' style={{ minHeight: '100%' }}>
                                                                                    <h6 className='h5 mt-2'>Document {index + 1}{index == 0 ? ".PDF/.DOCX" : index == 1 ? ".PDF/.DOCX" : ".PPT"}</h6>
                                                                                    <button type='button' onClick={() => BussinessIdeaDownloadFile(element.id)}><Download sx={{ color: 'white', background: '#51B56D' }} /></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

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