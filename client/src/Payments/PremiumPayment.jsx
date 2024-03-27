import React from 'react'
import { loadStripe } from '@stripe/stripe-js';

export default async function PremiumPayment(e) {
    const stripe = await loadStripe("pk_test_51MwA2iSGB6fTucrKO6vaYUKAP8jdlyz05IDzCMedaOX4i3eqUPsLHw8QgJMbBwOJRHxlxmGCZgSIU4fizbAHNwvI00PEAPb6uM");

    const body = e;

    const header = {
        "Content-Type": "application/json"
    };

    try {
        const response = await fetch("http://localhost:8080/api/create-checkout-session", {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        });

        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });


        if (result.error) {
            console.error(result.error);
        }
    } catch (error) {
        console.error(error);
    }
}
