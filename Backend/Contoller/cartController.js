const {v4}=require('uuid')
const mssql=require('mssql')
const { sqlConfig } = require('../Config/config')

const addToCart=async(req,res)=>{
    try {
        const productId=v4()
        const {productName,productCost,productImg,boughtBy}=req.body

        const pool=await mssql.connect(sqlConfig)
        const cart=(await pool.request()
        .input('productName',productName)
        .input('productId',productId)
        .input('productCost',productCost)
        .input('productImg',productImg)
        .input('boughtBy',boughtBy)
        .execute('addToCartProc'))
        if(cart){
            return res.status(200).json({message:"Product Added to Cart"})
        } else{
            return res.status(404).json({message:"Failed adding Product To Cart"})
        }
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}

const viewCart=async(req,res)=>{
    const userId=req.params.userId

    const pool=await mssql.connect(sqlConfig)
    const cart=(await pool.request()
    .input('userId',userId)
    .execute('viewCartProc')).recordset

    if(cart){
        return res.status(200).json({cart})
    } else{
        return res.status(402).json({message:"Failed Fetching cart"})
    }
}

//Remove All from Cart
const removeAllFromCart=async(req,res)=>{
    try {
        const userId=req.params.userId

        const pool=await mssql.connect(sqlConfig)
        const deletedItems=(await pool.request()
        .input('userId',userId)
        .execute('deleteFromCartProc'))
        if(deletedItems){
            return res.status(200).json({message:"Removed all Items From the cart"})
        } else{
            return res.status(400).json({message:"Failed to Remove Items from cart"})
        }
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}

const removeOneFromCart=async(req,res)=>{
    try {
        const productId=req.params.productId 
        const pool=await mssql.connect(sqlConfig)
        const removedItem=(await pool.request()
        .input('productId',productId)
        .execute('removeOneFromCartProc'))
        if(removedItem){
            return res.status(200).json({message:"Item Removed from cart"})
        
        }
        else{
            return res.status(401).json({message:"Error Removing Item From the Cart"})
        }
    } catch (error) {
        return res.status(400).json({Error:error.message})
    }
}
module.exports={
    addToCart,viewCart,removeAllFromCart,removeOneFromCart
}