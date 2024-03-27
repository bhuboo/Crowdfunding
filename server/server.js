const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const stripe = require('stripe')("sk_test_51MwA2iSGB6fTucrKMlQkafXB1kYiaI9Oef3CiXDBR1lFty6IPoH3CtTt7zHVhJAbO90qKF2ktox8udUjH80CGWky00rw2yjfxX");

dotenv.config();
const app = express();

var corOptions = {
    origin: 'http://localhost:5173'
}

// middlewares
app.use(cors(corOptions));
//Set Request Size Limit
app.use(express.json({ limit: "100mb", extended: true }));
app.use(
    express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 })
);
// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//token verifications 
const verification = require('./utils/verifications.js')

// routers
const routerauth = require('./routes/authRouter.js')
const routerinnvator = require('./routes/innovatorRouter.js');
const enterprenuerinnvator = require('./routes/enterprenuerRouter.js');
const db = require('./models/index.js');


app.use('/api/auth', routerauth)
app.use('/api/innovator', verification.authenticateToken, routerinnvator)
app.use('/api/enterprenuer', verification.authenticateToken, enterprenuerinnvator)





//testing API 

app.get('/', verification.authenticateToken, (req, res) => {
    res.json({ message: "hello from api..!", });
})


let PremiumSubcription = db.premiumSubcription;

app.post('/api/create-checkout-session', async (req, res) => {
    const data = req.body;
    let expiryDate = new Date();
    if (data.Period == 0) {
        expiryDate.setDate(expiryDate.getDate() + 30);
    } else {
        expiryDate.setDate(expiryDate.getDate() + 365);
    }

    const premiumSubcriptionobject = {
        UserId: data.UserId,
        SubcriptionType: data.SubcriptionType,
        ExpiryDate: expiryDate,
        DocumentType: data.DocumentType,
        Status: false
    }

    const createResponse = await PremiumSubcription.create(premiumSubcriptionobject);

    let PremiumId;

    if (createResponse) {
        PremiumId = createResponse.dataValues.id;
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: "nameof product",
                    },
                    unit_amount: Math.round(data.Cash * 100),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/shareideas/true/${PremiumId}`,
        cancel_url: 'https://www.google.com',
    });

    res.status(200).send({ id: session.id });
});


//port

const PORT = process.env.PORT || 8080;


//server

app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
})