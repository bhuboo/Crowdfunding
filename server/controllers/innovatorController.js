const { Op } = require('sequelize');

const db = require("../models");


//create model
const Users = db.users;
const BussinessIdea = db.bussinessIdea;
const PremiumSubcription = db.premiumSubcription;
const BussinessIdeaDocument = db.bussinessIdeaDocument;

const shareIdeaspage = async (req, res, next) => {
    try {
        const userId = req.body.userId;

        //response object
        let responseObject = {
            bussinessIdeaCount: 0,
            premiumSubcription: false,
            premiumSubcriptionDetail: null,
            bussinessIdea: []
        }

        //premium subcription detail object 
        let premiumSubcriptionDetailObject = {
            SubcriptionType: null,
            DocumentType: null
        }

        //bussiness idea Object 
        let bussinessIdeaObject = {
            Id: 0,
            BussinessName: "",
            InitialInvestment: 0,
            ModifyOn: Date.now()
        }


        const BussinessCount = await db.bussinessIdea.count({
            where: {
                [Op.or]: [
                    { UserId: userId },
                ]
            }
        })

        if (BussinessCount >= 0) {

            responseObject.bussinessIdeaCount = BussinessCount;

            const BussinessIdeadetail = await db.bussinessIdea.findAll({
                attributes: [['id', 'Id'], ['BussinessName', 'BussinessName'], 'InitialInvestment', ['updatedAt', 'ModifyOn']],
                where: {
                    [Op.or]: [
                        { UserId: userId },
                    ]
                }
            })

            responseObject.bussinessIdea = BussinessIdeadetail;

            // BussinessIdeadetail.forEach(element => {
            //     bussinessIdeaObject.Id = element.id;
            //     bussinessIdeaObject.BussinessName = element.BussinessName;
            //     bussinessIdeaObject.InitialInvestment = element.InitialInvestment;
            //     bussinessIdeaObject.ModifyOn = element.updatedAt;

            // });

            const PremiumSubcriptionCount = await db.premiumSubcription.count({
                where: {
                    [Op.or]: [
                        { UserId: userId, Status: true },
                    ]
                }
            })

            if (PremiumSubcriptionCount > 0) {

                responseObject.premiumSubcription = true;

                const PremiumSubcriptionDetail = await db.premiumSubcription.findOne({
                    attributes: ['id', 'SubcriptionType', 'DocumentType', 'updatedAt'],
                    where: {
                        [Op.or]: [
                            { UserId: userId, Status: true },
                        ]
                    }
                })

                if (PremiumSubcriptionDetail) {
                    premiumSubcriptionDetailObject.SubcriptionType = PremiumSubcriptionDetail.SubcriptionType;
                    premiumSubcriptionDetailObject.DocumentType = PremiumSubcriptionDetail.DocumentType;

                    responseObject.premiumSubcriptionDetail = premiumSubcriptionDetailObject;
                }
            }
        }

        res.status(200).send(responseObject);


    } catch (error) {
        next(error)
    }
}

const PaymentPremiumStatusUpdate = async (req, res, next) => {
    try {

        const Id = req.body.Id;
        const updatedPremiumSubscription = await PremiumSubcription.update({
            Status: true
        }, {
            where: { id: Id }
        });

        res.status(200).send({ Status: true })
    } catch (error) {
        next(error)
    }
}

const BussinessIdeaPost = async (req, res, next) => {
    try {

        const data = req.body;

        const BussinessIdeaObject = {
            UserId: data.UserId,
            BussinessName: data.BussinessName,
            BussinessType: data.BussinessType,
            InitialInvestment: data.InitialInvestment,
            Abstract: data.Abstract,
            BussinessIdeaDes: data.BussinessIdeaDes
        }

        const createResponse = await BussinessIdea.create(BussinessIdeaObject);

        const BussinessIdeaId = createResponse.dataValues.id;

        if (data.bussinessIdeaDocument.length > 0) {

            const responseDocument = await processBussinessIdeaDocuments(data, BussinessIdeaId);
            // data.bussinessIdeaDocument.forEach(async (element) => {

            //     const bussinessIdeaDocumentObject = {
            //         UserId: data.UserId,
            //         BussinessIdeaId: BussinessIdeaId,
            //         Documentfield: parseInt(element.Documentfield),
            //         DocumentType: parseInt(element.DocumentType),
            //         ContentBase64: element.ContentBase64,
            //     }
            //     const DocumentCreateResponse = await BussinessIdeaDocument.create(bussinessIdeaDocumentObject);
            // });
        }

        res.status(200).send({ Status: true, message: "Bussiness Idea Create successfully" })

    } catch (error) {
        // next(error)
        console.log(error)
    }
}

const BussinessIdeaPostget = async (req, res, next) => {
    try {
        const data = req.body;

        const BussinessIdeadetail = await db.bussinessIdea.findOne({
            where: {
                [Op.or]: [
                    { UserId: data.UserId, id: data.Id },
                ]
            }
        })

        const BussinessIdeaDocument = await db.bussinessIdeaDocument.findAll({
            attributes: ['id', 'Documentfield', 'DocumentType'],
            where: {
                [Op.or]: [
                    { UserId: data.UserId, BussinessIdeaId: BussinessIdeadetail.id },
                ]
            },
            order: [['Documentfield', 'ASC']]
        })

        const intrestSend = await db.messages.count({
            where: {
                bussinessDocumentId: data.Id
            }
        })
        let responseobject = {
            id: BussinessIdeadetail.id,
            BussinessName: BussinessIdeadetail.BussinessName,
            BussinessType: BussinessIdeadetail.BussinessType,
            InitialInvestment: BussinessIdeadetail.InitialInvestment,
            Abstract: BussinessIdeadetail.Abstract,
            BussinessIdeaDes: BussinessIdeadetail.BussinessIdeaDes,
            BussinessIdeaDocument: BussinessIdeaDocument,
            Intrestsend: intrestSend > 0 ? true : false,
        }
        res.status(200).send({ response: responseobject })

    } catch (error) {
        console.log(error);
    }
}


const BussinessIdeaPostUpdate = async (req, res, next) => {
    try {

        let data = req.body;
        let bussinessId = parseInt(data.id);

        const BussinessIdea = await db.bussinessIdea.update({
            BussinessName: data.BussinessName,
            BussinessType: data.BussinessType,
            InitialInvestment: data.InitialInvestment,
            Abstract: data.Abstract,
            BussinessIdeaDes: data.BussinessIdeaDes,
        },
            {
                where: { id: bussinessId, UserId: data.UserId }
            }
        );


        if (data.bussinessIdeaDocument.length > 0) {
            const responseDocument = await processBussinessIdeaDocumentsUpdate(data);
        }

        res.status(200).send({ Status: true, message: "Bussiness Idea Update successfully" })
    } catch (error) {
        console.log(error);
    }
}
const BussinessIdeaDocumentBAse64get = async (req, res, next) => {
    try {
        const data = req.body;

        const BussinessIdeaDocument = await db.bussinessIdeaDocument.findOne({
            where: {
                [Op.or]: [
                    { UserId: data.UserId, id: data.Id },
                ]
            }
        })

        res.status(200).send({ response: BussinessIdeaDocument })

    } catch (error) {
        console.log(error);
    }

}

async function processBussinessIdeaDocuments(data, BussinessIdeaId) {
    for (const element of data.bussinessIdeaDocument) {
        try {
            const bussinessIdeaDocumentObject = {
                UserId: data.UserId,
                BussinessIdeaId: BussinessIdeaId,
                Documentfield: parseInt(element.Documentfield),
                DocumentType: parseInt(element.DocumentType),
                ContentBase64: element.ContentBase64,
            };
            const DocumentCreateResponse = await BussinessIdeaDocument.create(bussinessIdeaDocumentObject);
            // Handle DocumentCreateResponse if needed
        } catch (error) {
            // Handle errors if any
            console.error("Error while processing bussinessIdeaDocument:", error);
        }
    }

    return true;
}

async function processBussinessIdeaDocumentsUpdate(data) {
    for (const element of data.bussinessIdeaDocument) {
        try {
            const id = parseInt(element.id);
            const bussinessIdeaDocumentObject = {
                Documentfield: parseInt(element.Documentfield),
                DocumentType: parseInt(element.DocumentType),
                ContentBase64: element.ContentBase64,
            };
            const DocumentCreateResponse = await BussinessIdeaDocument.update(
                bussinessIdeaDocumentObject,
                {
                    where: {
                        id: id
                    }
                }
            );
            // Handle DocumentCreateResponse if needed
        } catch (error) {
            // Handle errors if any
            console.error("Error while processing bussinessIdeaDocument:", error);
        }
    }

    return true;
}

module.exports = {
    shareIdeaspage,
    PaymentPremiumStatusUpdate,
    BussinessIdeaPost,
    BussinessIdeaPostget,
    BussinessIdeaDocumentBAse64get,
    BussinessIdeaPostUpdate
}