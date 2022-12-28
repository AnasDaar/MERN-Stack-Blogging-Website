const jwt = require('jsonwebtoken')
const User = require('../DB/user')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })


const authenticate = async(req,res,next)=>{
    try {
        const token = req.headers.authorization
        const verifytoken =jwt.verify(token,process.env.SECRET_KEY)

        const rootUser = await User.findOne({_id:verifytoken._id})
        if(!rootUser){
            throw new Error("User Not found")
        }
        req.token=token
        req.rootUser =rootUser
        req.userId=rootUser._id
        next()
        
    } catch (error) {
        res.status(400).json({status:400,message:"Unauthorized"})
        
    }




}










module.exports=authenticate