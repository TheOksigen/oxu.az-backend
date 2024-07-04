const express = require("express");
const Admin = require("../models/admin.schema");
const bcrypt = require("bcryptjs");
const route = express.Router();
const jwt = require('jsonwebtoken');
const loginfunction = require("../midleweare/login");

route.post("/register", loginfunction, async (req, res) => {
    try {
        const { login, password } = req.body;

        // Check if the login already exists
        const existingUser = await Admin.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ error: "login address already exists", status: false });
        }

        // If login does not exist, create a new user
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new Admin({ login, password: hashedPassword });
        await newUser.save(); // Save the new user to the database

        // Generate JWT token for the new user
        const token = jwt.sign({ userid: newUser._id }, process.env.JWT_TOKEN, { expiresIn: "99999999h" });

        // Return success response with user details and token
        res.status(200).json({
            id: newUser._id,
            login: newUser.login,
            status: true,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: false });
    }
});


route.post("/login", async (req, res) => {
    try {
        const { login, password } = req.body
        const user = await Admin.findOne({ login })
        if (!user) {
            return res.status(401).json({ error: "Sef login ve ya sifre", status: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Sef login ve ya sifre", status: false })
        } else if (user && isPasswordValid) {
            console.log(user._id);

            const token = jwt.sign({ userid: user._id }, process.env.JWT_TOKEN, { expiresIn: "99999999h" })


            console.log("Saalm");
            res.status(200).json({
                id: user.__id,
                login: user.login,
                status: true,
                token
            })
        }


    } catch (error) {
        console.log(error);
    }
})

module.exports = route