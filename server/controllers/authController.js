const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require('sequelize');

const db = require("../models");


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

module.exports = {
    register,
    login
}