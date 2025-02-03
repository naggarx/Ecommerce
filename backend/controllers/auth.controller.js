import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {redis} from '../lib/redis.js';
import { set } from 'mongoose';

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
};

const storeRefreshtoken = async(userId, refreshToken) => {

    await redis.set(`refresh_token:${userId}`, refreshToken,"EX", 7*24*60*60);  // 7 days  

};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // cannot be accessed by javascript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // csrf
        maxAge: 15*60*1000 // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // cannot be accessed by javascript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // csrf
        maxAge: 7*24*60*60*1000 // 7 days
    });

}

export const signup = async (req, res) => {
    const {email,password,name} = req.body;
    try {
            const userExists = await User.findOne({email});
        if(userExists)
            {
            return res.status(400).json
            ({
                error: 'User with that email already exists'
            });
        }
        const user = await User.create({name,email,password});

        //auth 
        const {accessToken ,refreshToken } = generateTokens(user._id);
        await storeRefreshtoken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role : user.role
        });
            
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message}); 
    }
};
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user &&  (await user.comparePassword(password))){
            const {accessToken, refreshToken} = generateTokens(user._id);
            await storeRefreshtoken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        }
        else {
            console.log('Invalid credentials');
            res.status(401).json({message: 'Invalid credentials'});
        }
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }

};
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: 'No refresh token provided'});
        } 
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);  
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
        if(refreshToken !== storedToken){
            return res.status(401).json({message: 'Invalid refresh token'});
        }
        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15*60*1000
        });
        res.json({message: 'Refreshed access token'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}   
   