const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req,res) => {
    try {

        const { username, email, password } = req.body;

        // console.log(User);
        

        const existingUser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password : hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "You've registered successfully!",
            user
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again"
        });
        
    }
};

const logIn = async (req, res) => {
    try {
        // console.log(req.body);
        
        let { email, password } = req.body;

        email = email?.trim().toLowerCase();

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: " Email and password are required"
            });
        }

        const user = await User.findOne({email}).select("+password");
        
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            });
        }
        

        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // console.log("LOGIN SECRET:", process.env.JWT_SECRET);
        
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
        
    }
}

module.exports = {
    register, logIn,
}