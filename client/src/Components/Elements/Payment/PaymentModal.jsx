import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PaymentCards from './PaymentCards';
import { Paymentdetail } from '../../../StaticData/data.js';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedPaymentModal({ open, handleClickOpen, handleClose }) {

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                BackdropProps={{
                    sx: {
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    },
                }}
                maxWidth={"lg"}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='bg-tertiary'>
                    Premium Plans
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers className='d-flex bg-tertiary'>
                    {
                        Paymentdetail && Paymentdetail.map((item, key) => (
                            <PaymentCards key={key} data={item} />
                        ))}
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}
