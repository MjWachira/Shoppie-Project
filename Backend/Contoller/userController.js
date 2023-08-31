const mssql=require('mssql')
const {v4}=require('uuid')
const bcrypt=require('bcrypt')

const dotenv=require('dotenv')
dotenv.config()

const { sqlConfig } = require('../Config/config')
const jwt=require('jsonwebtoken') 
const { userUpdateValidator, loginValidator } = require('../Validators/validator')


//USER REGISTRATION
const registerUser=async(req,res)=>{
    try {
        const userId=v4()
    
const {userPhone,userName,userEmail,userPassword,profilePic}=req.body
const hashedPwd=await bcrypt.hash(userPassword, 8)

const pool=await mssql.connect(sqlConfig)
const registerResult=(await pool.request()
.input('userId',userId)
.input('userPhone',userPhone)
.input('userName',userName)
.input('userEmail',userEmail)
.input('userPassword',hashedPwd)
.input('profilePic',profilePic)

.execute('registerUserProc'))
if(registerResult.rowsAffected[0] == 1){
    return res.status(200).json({message:'Registered succesfully'})
} else{
    return res.status(400).json({message:'Registration Failed'})
}
} catch (error) {
    
        return res.json({Error:error.message})
    }
}

//USER LOGIN Controller
const loginUser=async(req,res)=>{
    try {
        const {userEmail,userPassword,role,userId,profilePic}=req.body 

        if(!userEmail || !userPassword){
            return res.status(400).json({error:"Kindly input your credentials"})
        }
        const {error}=loginValidator.validate(req.body)
        if(error){
            return res.status(422).json(error.details[0].message)
        }
       const pool=await mssql.connect(sqlConfig)
       const user=(await pool.request().input('userEmail',userEmail).execute('userLoginProc')).recordset[0]
       const hashedPwd=user.userPassword

       
       if(user){
        const comparePassword=await bcrypt.compare(userPassword, hashedPwd)

        if(comparePassword){
            const {userPassword,userId,role,profilePic,...payload}=user 
            const token=jwt.sign(payload, process.env.SECRET,{expiresIn:'360000s'})
            return res.status(200).json({message:'Logged in successful',token:token,role,userId,profilePic})
                
           }else{
            return res.status(400).json({message:'Invalid Log in'})
           }
       }else{
        return res.status(400).json({message:'Wrong Log in Details'})
       }
    } catch (error) {
        res.json({message:'Wrong Log in Details'})
    }
}

//USER UPDATE DETAILS

const updateUser=async(req,res)=>{
    try {
        const {userId}=req.params 
        const {userName,userEmail,userPhone,userPassword,profilePic}=req.body
        
         const {error}=userUpdateValidator .validate(req.body)
        //  if(error){
        //      return res.status(422).json(error.details[0].message)
        //  }
        
        
        const hashedPassword=await bcrypt.hash(userPassword, 10)
        
        const pool =await  mssql.connect(sqlConfig)
        
            const result=(await pool.request()
            .input('userId',userId)
            .input('userName',userName)
            .input('userEmail',userEmail)
            .input('userPhone',userPhone)
            .input('userPassword',hashedPassword)
            .input('profilePic',profilePic)
           .execute('userUpdateProc'))
           
           if(result.rowsAffected ==1 ){
            return res.status(200).json({message: "Details updated succsessfully"})
           }else{
            return res.status(400).json({message: "Details not  updated"})
           }
        
        
    } catch (error) {
        return res.json({Error:error})
    }
}


module.exports={
    registerUser,loginUser,updateUser
}