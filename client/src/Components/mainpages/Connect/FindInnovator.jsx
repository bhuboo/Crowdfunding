import React from 'react'
import Navbar from '../navbar'
import Footer from '../Footer'
import { Link } from 'react-router-dom'
import Findinnovatormain from './findinnovatormain'

export default function FindInnovator() {
    return (
        <>
            <Navbar />
            <Findinnovatormain />
            <Footer />
        </>
    )
}
