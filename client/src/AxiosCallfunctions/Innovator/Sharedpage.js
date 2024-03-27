import axios from "axios"

const user = JSON.parse(localStorage.getItem("user"));
let Bearertoken = "";
if (JSON.parse(localStorage.getItem("user")) != null) {
    Bearertoken = "Bearer " + JSON.parse(localStorage.getItem("user")).access_token;
}

export const Initialapicall = async () => {

    let objectbody = {
        userId: JSON.parse(localStorage.getItem("user")).Id
    }

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };
    const response = await axios.post("innovator/shareideapage", objectbody, { headers });

    return response;
}

export const PaymentUpdateStatus = async (e) => {
    let objectbody = {
        Id: e,
    }


    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };
    const response = await axios.post("innovator/PremiumPaymentUpdate", objectbody, { headers });

    return response;
}

export const BussinessIdeaCreate = async (e) => {
    let objectbody = e;

    objectbody.UserId = JSON.parse(localStorage.getItem("user")).Id;

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };

    const response = await axios.post("innovator/BussinessIdeaCreate", objectbody, { headers });

    return response;
}

export const BussinessIdeaUpdate = async (e) => {
    let objectbody = e;

    objectbody.UserId = JSON.parse(localStorage.getItem("user")).Id;

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };

    const response = await axios.post("innovator/BussinessIdeaUpdate", objectbody, { headers });

    return response;
}

export const BussinessIdeaPostGet = async (e) => {
    let objectbody = e;

    objectbody.UserId = JSON.parse(localStorage.getItem("user")).Id;

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };

    const response = await axios.post("innovator/BussinessIdeaPostDetail", objectbody, { headers });

    return response;
}

export const BussinessIdeaDownloadFileGET = async (e) => {
    let objectbody = e;

    objectbody.UserId = JSON.parse(localStorage.getItem("user")).Id;

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };

    const response = await axios.post("innovator/BussinessIdeaDocumentDetail", objectbody, { headers });

    return response;
}