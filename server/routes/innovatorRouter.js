// import controllers review, products
const innovatorController = require('../controllers/innovatorController.js');

// router
const router = require('express').Router()


// use routers

//innovator router
router.post('/shareideapage', innovatorController.shareIdeaspage);
router.post('/PremiumPaymentUpdate', innovatorController.PaymentPremiumStatusUpdate);
router.post('/BussinessIdeaCreate', innovatorController.BussinessIdeaPost);
router.post('/BussinessIdeaPostDetail', innovatorController.BussinessIdeaPostget);
router.post('/BussinessIdeaDocumentDetail', innovatorController.BussinessIdeaDocumentBAse64get);
router.post('/BussinessIdeaUpdate', innovatorController.BussinessIdeaPostUpdate);
router.post('/BussinessIdeaDelete', innovatorController.BussinessIdeaDelete);


module.exports = router