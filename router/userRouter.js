const express = require("express");

const {UserModel} = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userRouter = express.Router();


userRouter.post("/signup",async(req,res)=>{
const {email,password,confirmPassword} = req.body;

try {
    const user = await UserModel.findOne({email});
    if(!user){
bcrypt.hash(password,8,async(err,hash)=>{
    if(err){
        res.status(400).json({"msg":"something went wrong , please try again!"})
    }else{
        const newUser = new UserModel({email,password:hash,confirmPassword:hash});
        await newUser.save();
        res.status(200).json({"msg":"You're account has been created successfully.",newUser});

    }

})
    }else{
        res.status(400).json({"msg":"Already registered, try to login."})
    }
} catch (error) {
    res.status(500).json({"msg":"internal Server Error"})
}


});

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body;

    try {
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    let token = jwt.sign({id:"masai"},"masaiHospital",{expiresIn:"1m"});
                    res.cookie("token",token);
                    res.status(200).json({"msg":"Login Successfull"})

                }else{
                    res.status(400).json({"msg":"Invalid Credentials"})
                }
            })
        }else{
            res.status(400).json({"msg":"Signup required firstly."})
        }
    } catch (error) {
       res.status(500).json({"msg":"Internal Server Error"}) 
    }
})

module.exports={ userRouter};