import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false,
                
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: 'User registered successfully',
            success: true
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}

export const login = async(req, res) => {
 try{
    const {email, password, role} = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({
            message: 'Something is missing',
            success: false,
        });
    };
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"Incorrect Email or password",
            success:false
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:'Incorrect Email or password',
            success:false,
        })
    }
    //check role is correct or not
    if(role !== user.role){
        return res.status(400).json({
            message:"Account doesn't exist with current role",
            success:false
        })
    };
    const tokenData = {
        userId:user._id
    }
    const token = await jwt.sign(tokenData,process.env.SECRET_KEY,)
 }

 catch(error){
    console.error("Error during Login:", error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });

 }
}