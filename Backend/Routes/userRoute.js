const Router=require('express')
const { registerUser, loginUser, updateUser } = require('../Contoller/userController')
const { tokenVerfying } = require('../Middleware/tokenVerify')


const userRoute=Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.put('/update/:userId',tokenVerfying, updateUser)



module.exports={
    userRoute
}