import * as React from 'react';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import { List, ListItem } from '@mui/material';
import { CurrencyRupee, ListAlt } from '@mui/icons-material';
import PremiumPayment from '../../../Payments/PremiumPayment';
import { AuthContext } from '../../../context/AuthContext';

export default function PaymentCards({ data }) {
    const { user } = React.useContext(AuthContext);

    const [monthanual, setmonthanual] = React.useState(0);

    const Paymenthandle = (e) => {
        e.preventDefault();
        let dataBody = {
            UserId: user.Id,
            SubcriptionType: data[monthanual].SubcriptionType,
            DocumentType: data[monthanual].DocumentType,
            Cash: data[monthanual].Price,
            Period : monthanual
        }
        PremiumPayment(dataBody);
    }
    return (
        <Card
            sx={{
                width: 420,
                maxWidth: '80%',
                boxShadow: 'lg',
                marginLeft: '12px',
                marginRight: '12px'
            }}
        >
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Chip
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                        mt: -1,
                        mb: 1,
                        border: '3px solid',
                        borderColor: 'background.surface',
                    }}
                >
                    {data[monthanual].PaymentLevel}
                </Chip>
                <Typography level="title-lg">{data[monthanual].PaymentLevel} Plan Detail</Typography>
                <Typography level="title-lg" sx={{ fontWeight: 'bold' }}>{monthanual == 0 ? "Monthly" : "Annualy"}</Typography>
                <Typography level="title-sm" sx={{ alignSelf: 'self-start' }}>Features</Typography>
                <Typography level="body-sm"
                    sx={data[monthanual].SubcriptionType == 1 ? { maxWidth: '100%', textAlign: 'start', paddingTop: "20px" } : { maxWidth: '100%', textAlign: 'start' }}
                >
                    {data[monthanual].Description}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2,
                        '& > button': { borderRadius: '2rem' },
                    }}
                >
                    {data[monthanual].PaymentLevel + ": " + "₹" + data[monthanual].Price}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2,
                        '& > button': { borderRadius: '2rem' },
                    }}
                >
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        <Button sx={monthanual == 0 && { background: "#198754 !important", color: "white" }} onClick={() => setmonthanual(data[0].Type)}>Month</Button>
                        <Button sx={monthanual == 1 && { background: "#198754 !important", color: "white" }} onClick={() => setmonthanual(data[1].Type)}>Annual</Button>
                    </ButtonGroup>
                </Box>
            </CardContent>
            <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                        <Button type='button' onClick={Paymenthandle}>Buy</Button>
                    </ButtonGroup>
                </CardActions>
            </CardOverflow>
        </Card>
    );
}