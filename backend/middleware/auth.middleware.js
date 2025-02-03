import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: "You are not authorized to access this route" });
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "No user found with this id" });
            }
            req.user = user;
            next();
        } catch (error) {
            if(error.name == "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired. Please login again" });
            }
            throw error;  
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const adminRoute = (req, res, next) => {
    if (req.user && req.user.role == "admin") 
        {
        next();
    } 
    else {
        res.status(403).json({ message: "You are not authorized as an admin" });
    }
}