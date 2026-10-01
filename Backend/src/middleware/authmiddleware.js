const jwt = require("jsonwebtoken");

function auth (req, res, next) {
    try {
        // Header se token lo
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }
        
        // Extract token from "Bearer <token>" format
        const token = authHeader.startsWith("Bearer ") 
            ? authHeader.slice(7) 
            : authHeader;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();       

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
}

module.exports = auth;