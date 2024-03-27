// import controllers review, products
const enterprenuerController = require('../controllers/enterprenuerController.js');

// router
const router = require('express').Router()


// use routers

//innovator router
router.post('/BussinessIdeasGET', enterprenuerController.BussinessIdeas);
router.post('/followreq', enterprenuerController.ReqFollowe);
router.post('/chatlist', enterprenuerController.ChatList);
router.post('/chatmessages', enterprenuerController.messages);
router.post('/sendmessage', enterprenuerController.sendmessage);


module.exports = router;