const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const { userRoute } = require('./Routes/userRoute')
const { productRoute } = require('./Routes/productRoute')
const { cartRoute } = require('./Routes/cartRoute')
const { resetRoute } = require('./Routes/resetPasswordRoute')

const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/reset',resetRoute)

app.listen(4700,()=>{
    console.log('Server active on port 4700')
})