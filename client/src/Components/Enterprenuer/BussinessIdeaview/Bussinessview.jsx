import React from 'react'
import Navbar from '../../mainpages/navbar.jsx'
import Footer from '../../mainpages/Footer.jsx'
import BussinessIdeaview from './BussinessIdeaview.jsx'
import { useParams } from 'react-router-dom';

export default function Bussinessview() {

    const { UserId, Id } = useParams();

    return (
        <>
            <Navbar />
            <BussinessIdeaview UserId={UserId} Id={Id} />
            <Footer />
        </>
    )
}
