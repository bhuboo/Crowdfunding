const { Op } = require('sequelize');
const db = require("../models");
const { sendmail } = require("../utils/sendmail.js");


//create model

const BussinessIdeas = async (req, res, next) => {
    try {

        const requserId = req.body.UserId;
        //response object
        let bussinessIdea = []


        const BussinessIdeadetail = await db.bussinessIdea.findAll({
            attributes: [['id', 'Id'], ['BussinessName', 'BussinessName'], 'InitialInvestment', 'BussinessType', ['updatedAt', 'IdeaCreatedon'], ['Abstract', 'Abstract'], 'UserId'],
            order: [['id', 'DESC']]
        })
        if (BussinessIdeadetail.length > 0) {

            for (let i = 0; i < BussinessIdeadetail.length; i++) {
                try {
                    const userDetail = await db.users.findOne({
                        where: { id: BussinessIdeadetail[i].UserId }
                    });

                    const followerCount = await db.followers.count({
                        where: { UserId: requserId, FollowedId: BussinessIdeadetail[i].UserId }
                    });


                    let followedExist = followerCount > 0;

                    let responseObject = {
                        UserName: userDetail.FullName,
                        Followedexist: followedExist,
                        UserId: BussinessIdeadetail[i].dataValues.UserId,
                        IdeaCreatedon: getTimeDifference(BussinessIdeadetail[i].dataValues.IdeaCreatedon),
                        BussinessId: BussinessIdeadetail[i].dataValues.Id,
                        BussinessName: BussinessIdeadetail[i].dataValues.BussinessName,
                        InitialInvestment: BussinessIdeadetail[i].dataValues.InitialInvestment,
                        Abstract: BussinessIdeadetail[i].dataValues.Abstract,
                        BussinessType: BussinessIdeadetail[i].dataValues.BussinessType,
                    };

                    bussinessIdea.push(responseObject);
                } catch (error) {
                    console.error("Error while processing bussinessIdeaDocument:", error);
                }
            }

            res.status(200).send({ response: bussinessIdea });

        }

    } catch (error) {
        next(error)
    }
}

const ReqFollowe = async (req, res, next) => {
    try {
        const data = req.body;

        const existfollow = await db.followers.findOne({
            where: {
                UserId: data.UserId, FollowedId: data.FollowedId
            }
        });
        if (existfollow) {
            const updateunfollowe = await db.followers.destroy({
                where: {
                    id: existfollow.id
                }
            })

            res.status(200).send({ message: "Un follow Successfully " })
        } else {

            let followobject = {
                UserId: data.UserId,
                FollowedId: data.FollowedId
            }
            const createfollow = await db.followers.create(followobject);

            res.status(200).send({ message: "Follow Successfully " })
        }
    } catch (error) {
        console.log(error);
    }
}

const ChatList = async (req, res, next) => {
    try {
        const data = req.body;

        // Define the raw SQL query
        const rawQuery = `
        SELECT DISTINCT M.senderId, M.receiverId, U.FullName AS FullName, U.Id AS Id 
        FROM (
            SELECT senderId, receiverId, MAX(createdAt) AS max_createdOn
            FROM messages 
            WHERE senderId = ${data.UserId} OR receiverId = ${data.UserId}
            GROUP BY senderId, receiverId
        ) AS LatestMessage
        INNER JOIN messages M 
            ON LatestMessage.senderId = M.senderId 
            AND LatestMessage.receiverId = M.receiverId 
            AND LatestMessage.max_createdOn = M.createdAt
        INNER JOIN users U ON (U.Id = M.senderId OR U.Id = M.receiverId) AND U.Id != ${data.UserId}
        GROUP BY M.senderId, M.receiverId
        ORDER BY LatestMessage.max_createdOn DESC;              
        `;
        // Execute the raw query
        const ChatListres = await db.sequelize.query(rawQuery, {
            type: db.Sequelize.QueryTypes.SELECT
        })

        const uniqueRecords = [];
        const idSet = new Set();

        ChatListres.forEach(record => {
            if (!idSet.has(record.Id)) {
                uniqueRecords.push(record);
                idSet.add(record.Id);
            }
        });

        res.status(200).send({ response: uniqueRecords })
    } catch (error) {
        console.log(error);
    }
}


const messages = async (req, res, next) => {
    try {

        const data = req.body;

        const BussinessIdeadetail = await db.messages.findAll({
            attributes: [['id', 'Id'], ['senderId', 'senderId'], 'receiverId', 'message', ['createdAt', 'createdAt']],
            where: {
                [Op.or]: [
                    { senderId: data.senderId, receiverId: data.receiverId },
                    { senderId: data.receiverId, receiverId: data.senderId }
                ]
            },
            order: [['createdAt', 'DESC']]
        });


        res.status(200).send({ response: BussinessIdeadetail });

    } catch (error) {
        next(error)
    }
}

const sendmessage = async (req, res, next) => {
    try {

        const data = req.body;

        let createObject = {
            senderId: data.senderId,
            receiverId: data.receiverId,
            message: data.message,
            bussinessDocumentId: null
        }
        console.log(data, "rtr")

        if (data.Id != null) {

            const bussinessIdea = await db.bussinessIdea.findOne({
                where: {
                    id: data.Id
                }
            })
            const senderDetail = await db.users.findOne({
                where: {
                    id: data.senderId
                }
            })

            const receiverdetail = await db.users.findOne({
                where: {
                    id: data.receiverId
                }
            })
            let messageobject = {
                from: senderDetail.Email,
                to: receiverdetail.dataValues.Email,
                subject: `Exciting Business Proposal: ${senderDetail.dataValues.FullName}, Please Review!`,
                text: `Your Bussiness Idea ${bussinessIdea.dataValues.BussinessName} get one proposal please check it.`
            }
            console.log(messageobject, "mail")
            const msgsendres = sendmail(messageobject);
            createObject.bussinessDocumentId = data.Id;

            const createMessage = await db.messages.create(createObject);
        } else {

            const createMessage = await db.messages.create(createObject);
        }



        res.status(200).send({ response: "Message Send SuccessFully" });

    } catch (error) {
        next(error)
    }
}


// Function to convert timestamp to human-readable format
function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const timeDiff = (currentTime - new Date(timestamp)) / 1000; // Time difference in seconds

    if (timeDiff < 60) {
        return `${Math.floor(timeDiff)} second${Math.floor(timeDiff) > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 3600) {
        return `${Math.floor(timeDiff / 60)} minute${Math.floor(timeDiff / 60) > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 86400) {
        return `${Math.floor(timeDiff / 3600)} hour${Math.floor(timeDiff / 3600) > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 2592000) {
        return `${Math.floor(timeDiff / 86400)} day${Math.floor(timeDiff / 86400) > 1 ? 's' : ''} ago`;
    } else if (timeDiff < 31536000) {
        return `${Math.floor(timeDiff / 2592000)} month${Math.floor(timeDiff / 2592000) > 1 ? 's' : ''} ago`;
    } else {
        return `${Math.floor(timeDiff / 31536000)} year${Math.floor(timeDiff / 31536000) > 1 ? 's' : ''} ago`;
    }
}



module.exports = {
    BussinessIdeas,
    ReqFollowe,
    ChatList,
    messages,
    sendmessage
}