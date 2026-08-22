const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const registerUser = async (req, res) => {

    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.create(
            fullName,
            email,
            hashedPassword,
            (error, result) => {

                if (error) {

                    if (error.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message: "Email already registered"
                        });
                    }

                    return res.status(500).json({
                        message: "Failed to create user"
                    });
                }

                res.status(201).json({
                    message: "User registered successfully",
                    userId: result.insertId
                });

            }
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};



const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        User.findByEmail(email, async (error, user) => {

            if (error) {

                return res.status(500).json({
                    message: "Database error"
                });

            }


            if (!user) {

                return res.status(401).json({
                    message: "Invalid email or password"
                });

            }


            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );


            if (!isPasswordCorrect) {

                return res.status(401).json({
                    message: "Invalid email or password"
                });

            }


            const token = jwt.sign(
                {
                  id: user.id,
                 email: user.email
                },

               process.env.JWT_SECRET,

               {
                 expiresIn: "1h"
               }
            );


            res.status(200).json({

                message: "Login successful",

                token: token,

                user: {
                    id: user.id,
                    fullName: user.full_name,
                    email: user.email
                }

            });

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};


module.exports = {
    registerUser,
    loginUser
};