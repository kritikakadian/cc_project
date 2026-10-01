const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validate inputs
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Full name is required"
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }
       
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered"
            });
        }
        
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(), 
            email: email.toLowerCase().trim(), 
            password: hashedpassword
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log("REGISTER ERROR:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Registration failed"
        });
    }
}

async function loginUser(req, res) {
    try {
        const { password, email } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log("LOGIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
};
