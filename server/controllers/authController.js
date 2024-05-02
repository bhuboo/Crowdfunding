const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');

const db = require("../models");

const { sendmail } = require('../utils/sendmail');
//create model
const Users = db.users;

//register 
const register = async (req, res) => {
    try {

        const requiredFields = ['Fullname', 'Username', 'Password'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `${field} is required.` });
            }
        }

        // password hased
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.Password, salt);

        // Check if email already exists
        const existingEmail = await Users.findOne({
            where: { email: req.body.Username }
        });

        if (existingEmail) {
            if (existingEmail.isDeleted) {
                return res.status(400).send({ message: "your account has been deleted. If you want to recover the old account..!" });
            }
            return res.status(409).json({ message: 'Email already exists.' });
        }

        // // Check if phone number already exists
        // const existingPhoneNumber = await Users.findOne({
        //     where: { phonenumber: req.body.phonenumber }
        // });

        // if (existingPhoneNumber) {
        //     return res.status(409).json({ message: 'Phone Number already exists.' });
        // }

        let info = {
            FullName: req.body.Fullname,
            Email: req.body.Username,
            Password: hashpassword,
            UserType: req.body.UserType,
            isActive: true,
            isBlocked: false,
            isDeleted: false,
        };
        // Create a new user
        const newUser = await Users.create(info);

        res.status(201).send({ message: "User Account created." });

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//login
const login = async (req, res, next) => {
    try {

        const requiredFields = ['Username', 'Password'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required.` });
            }
        }

        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.Username },
                ]
            }
        });
        if (!user) return res.status(404).send({ message: "User not found!" });


        const isPasswordCorrect = await bcrypt.compare(
            req.body.Password,
            user.Password
        );
        if (!isPasswordCorrect) {
            return res.status(400).send({ message: "Wrong password...!" });
        }

        if (!user.isActive) {
            return res.status(400).send({ message: "sorry to inform you that your account has been temporarily blocked by the administrator.!" });
        }

        if (user.isBlocked) {
            return res.status(400).send({ message: "sorry to inform you that your account has been permenantly blocked by the administrator.!" });
        }
        if (user.isDeleted) {
            return res.status(201).send({ message: "your account has been deleted. If you want to recover the old account..!" });
        }

        const token = jwt.sign(
            { id: user.Id, UserType: user.UserType },
            process.env.JWT
        );

        const userdetails = {
            Id: user.id,
            FullName: user.FullName,
            UserType: user.UserType,
            access_token: token,
            UserId: user.Id,
        }

        res.status(200).json({ message: "Login Successful", userdetails: userdetails });

    } catch (err) {
        next(err);
    }
};


const forgetemail = async (req, res, next) => {
    try {

        const requiredFields = ['email'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required.` });
            }
        }

        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                ]
            }
        });



        if (!user) return res.status(404).send({ message: "User not found!" });

        if (!user.isActive) {
            return res.status(400).send({ message: "sorry to inform you that your account has been temporarily blocked by the administrator.!" });
        }

        if (user.isBlocked) {
            return res.status(400).send({ message: "sorry to inform you that your account has been permenantly blocked by the administrator.!" });
        }
        if (user.isDeleted) {
            return res.status(201).send({ message: "your account has been deleted. If you want to recover the old account..!" });
        }

        let random_number = Math.floor(100000 + Math.random() * 900000);
        // random_number = random_number.substring(-2);
        var mailOptions = {
            from: 'testpurpose20232023@gmail.com',
            to: req.body.email,
            subject: 'Forget Password',
            text: 'Your Forget Password OTP : ' + random_number,
        };

        let responsemail = sendmail(mailOptions);

        await Users.update(
            { Otp: random_number },
            {
                where: {
                    [Op.or]: [
                        { email: req.body.email },
                    ]
                }
            },
        );

        res.status(200).json({ message: "OTP send Successful", OTP: random_number, Email: req.body.email });

    } catch (err) {
        next(err);
    }
};


const forgetotp = async (req, res, next) => {
    try {

        const requiredFields = ['email', 'OTP'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required.` });
            }
        }

        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                ]
            }
        });



        if (!user) return res.status(404).send({ message: "User not found!" });

        if (!user.isActive) {
            return res.status(400).send({ message: "sorry to inform you that your account has been temporarily blocked by the administrator.!" });
        }

        if (user.isBlocked) {
            return res.status(400).send({ message: "sorry to inform you that your account has been permenantly blocked by the administrator.!" });
        }
        if (user.isDeleted) {
            return res.status(201).send({ message: "your account has been deleted. If you want to recover the old account..!" });
        }

        if (user.Otp != req.body.OTP) {
            res.status(201).json({ message: "Invalid OTP.Please enter valid OTP.", Email: req.body.email });
        }

        if (user.Otp == req.body.OTP) {
            res.status(200).json({ message: "OTP verify Successfully.", OTP: req.body.email, Email: req.body.email });
        }

    } catch (err) {
        next(err);
    }
};

const forgetPasschange = async (req, res, next) => {
    try {

        const requiredFields = ['email', 'Password'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required.` });
            }
        }

        const user = await Users.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                ]
            }
        });



        if (!user) return res.status(404).send({ message: "User not found!" });

        if (!user.isActive) {
            return res.status(400).send({ message: "sorry to inform you that your account has been temporarily blocked by the administrator.!" });
        }

        if (user.isBlocked) {
            return res.status(400).send({ message: "sorry to inform you that your account has been permenantly blocked by the administrator.!" });
        }
        if (user.isDeleted) {
            return res.status(201).send({ message: "your account has been deleted. If you want to recover the old account..!" });
        }

        // password hased
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(req.body.Password, salt);

        await Users.update(
            { Password: hashpassword },
            {
                where: {
                    [Op.or]: [
                        { email: req.body.email },
                    ]
                }
            },
        );

        res.status(200).send({ message: "Your account Password change successfully." });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    forgetemail,
    forgetotp,
    forgetPasschange
}