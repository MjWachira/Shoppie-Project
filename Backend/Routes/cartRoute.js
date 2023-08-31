const Router=require('express')
const {  addToCart, viewCart, removeAllFromCart, removeOneFromCart } = require('../Contoller/cartController')
const { tokenVerfying } = require('../Middleware/tokenVerify')

const cartRoute=Router()

cartRoute.post('/add',tokenVerfying, addToCart)
cartRoute.get('/viewCart/:userId',tokenVerfying,viewCart)
cartRoute.delete('/deleteAll/:userId',tokenVerfying,removeAllFromCart)
cartRoute.delete('/removeOne/:productId',tokenVerfying,removeOneFromCart)

module.exports={
    cartRoute
}