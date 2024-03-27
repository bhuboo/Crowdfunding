import axios from "axios"

const user = JSON.parse(localStorage.getItem("user"));
let Bearertoken = "";
if (JSON.parse(localStorage.getItem("user")) != null) {
    Bearertoken = "Bearer " + JSON.parse(localStorage.getItem("user")).access_token;
}

export const Initialapicall = async () => {

    let objectbody = {
        UserId: JSON.parse(localStorage.getItem("user")).Id
    }

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };
    const response = await axios.post("enterprenuer/BussinessIdeasGET", objectbody, { headers });

    return response;
}

export const followrequestapi = async (e) => {

    let objectbody = {
        UserId: JSON.parse(localStorage.getItem("user")).Id,
        FollowedId: e
    }

    const headers = {
        'Authorization': Bearertoken,
        'Content-Type': 'application/json' // Adjust content type if needed
    };
    const response = await axios.post("enterprenuer/followreq", objectbody, { headers });

    return response;
}
