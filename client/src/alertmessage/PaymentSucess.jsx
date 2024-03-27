import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
export default function PaymentSucess(title, text, icon) {

    return (
        withReactContent(Swal).fire({
            title: title,
            text: text,
            icon: icon,
            showConfirmButton: true,
        })
    )
}
