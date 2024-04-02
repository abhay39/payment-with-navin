import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const secrete="NavinIsBetichodAnd";

export const signup=async(req,res)=>{
    const {name,email,password,mobileNumber}= req.body;
    try{
        const checkUser= await User.findOne({
            email:email,
            mobileNumber:mobileNumber
        })
        if(checkUser){
            res.status(400).json({
                message:"User Already Exists"
            })
            return;
        }
        const hashedPassword= await bcrypt.hash(password,10);

        const newUser= new User({
            name:name,
            email:email,
            password:hashedPassword,
            mobileNumber:mobileNumber
        })
        await newUser.save();
        res.status(201).json({
            message:"User Created Successfully",
            user:newUser
        })
        
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:err.message
        })
    }
}

export const totalUsers=async(req,res)=>{
    const totalUsers = await User.find();
    res.status(200).json(totalUsers)
}

export const login=async(req,res)=>{
    const {email,password}= req.body;
    try{
        const checkUser= await User.findOne({email:email});
        if(!checkUser){
            res.status(400).json({
                message:"User Does Not Exist"
            })
            return;
        }

        const checkPassword= await bcrypt.compare(password,checkUser.password);
        if(!checkPassword){
            res.status(400).json({
                message:"Password Does Not Match"
            })
            return;
        }
        
        const token = jwt.sign({id:checkUser._id}, secrete,{
            expiresIn: "15d"
        })

        res.status(200).json({
            message:"User Logged In Successfully",
            token:token
        })
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:err.message
        })
    }
}

export const getCurrentUserDetails=async(req,res)=>{
    try{
        const {token}=req.params;
        const isValid= jwt.verify(token,secrete);

        if(!isValid){
            res.status(400).json({
                message:"Invalid Token"
            })
            return;
        }
        const isUser=await User.findById({
            _id:isValid.id
        }).select("-password");
        if(!isUser){
            res.status(400).json({
                message:"User Does Not Exist"
            })
            return;
        }
        res.status(200).json(isUser)
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message:err.message
        })
    }

}