const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testpurpose20232023@gmail.com',
        pass: 'wbrq ppiw rlae gukh'
    }
});


const sendmail = (req) => {
    var mailOptions = {
        from: req.from,
        to: req.to,
        subject: req.subject,
        text: req.text
    };


    console.log(mailOptions, "cdhvsvjv mailOptioms")
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    sendmail
}