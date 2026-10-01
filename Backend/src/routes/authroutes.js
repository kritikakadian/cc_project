const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../Controllers/authcontroller");
const auth = require("../middleware/authmiddleware");
const User = require("../models/user");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;