const mssql=require('mssql')
const {v4}=require('uuid') 
const { sqlConfig } = require('../Config/config')

const addProduct=async(req,res)=>{
    try {
        
    const productId = v4()
    const {productName,productDescription,productClassification,productCategory,productCost,productImg,earlyCost} = req.body
    
    const pool = await mssql.connect(sqlConfig)
    
        const result = await pool.request()
        .input('productId', mssql.VarChar, productId)
        .input('productName', mssql.VarChar, productName)
        .input('productDescription', mssql.VarChar, productDescription)
        .input('productClassification', mssql.VarChar, productClassification)
        .input('productCategory',productCategory)
        .input('productCost',productCost)
        .input('productImg',productImg)
        .input('earlyCost',earlyCost)
        .execute('addProductPROC')

    
         if(result.rowsAffected[0]==1){  
         return res.status(200).json({
             message: "Product added Succesfully",
         })}
         else{
             return res.status(400).json({message: "Product adding failed"})
         }
    } catch (error) {
        return res.status(400).json({Error:error.message})
    }
}

const updateProduct=async(req,res)=>{
    try {
        const productId=req.params.productId
        const {productName,productDescription,productClassification,productCategory,productCost,productImg,earlyCost} = req.body
        const pool = await mssql.connect(sqlConfig)
    
        const result = await pool.request()
        .input('productId', mssql.VarChar, productId)
        .input('productName', mssql.VarChar, productName)
        .input('productDescription', mssql.VarChar, productDescription)
        .input('productClassification', mssql.VarChar, productClassification)
        .input('productCategory',productCategory)
        .input('productCost',productCost)
        .input('productImg',productImg)
        .input('earlyCost',earlyCost)
        .execute('updateProductPROC')

    
         if(result.rowsAffected[0]==1){  
         return res.status(200).json({
             message: "Product Update Succesfully",
         })}
         else{
             return res.status(400).json({message: "Product Update failed"})
         }

        
    } catch (error) {
       return res.status(400).json({Error:error.message}) 
    }
}

//VIEW ONE PRODUCT
const viewOneProduct=async(req,res)=>{
    try { 
        const productId=req.params.productId
        const pool=await mssql.connect(sqlConfig)
        const oneProduct=(await pool.request()
        .input('productId',mssql.VarChar, productId)
        .execute('viewOneProductProc')).recordset[0]

        if(oneProduct){
            return res.status(200).json({message:'Here is the product',oneProduct})
        } else{
            return res.status(400).json({message:'Failed to fetch The Product'})
        }
        
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}

//VIEW ALL PRODUCTS 
const viewAllproducts=async(req,res)=>{
    try {
        
        const pool=await mssql.connect(sqlConfig)
        const allProducts=(await pool.request()
        .execute('viewAllproductsProc'))

        const productsWithImageUrl = allProducts.recordset.map(product => ({
            ...product,
            productImg: `${product.productImg}`
          
          }));
      
          return res.status(200).json(productsWithImageUrl);
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}

//view products according to category
const viewProductsCategory=async(req,res)=>{
    try { 
        const productCategory=req.params.productCategory
        const pool=await mssql.connect(sqlConfig)
        const products=(await pool.request()
        .input('productCategory',productCategory)
        .execute('viewProductWithCategory')).recordset
        if(products){
            return res.status(200).json({message:"Here are products in your category", products})
        } else{
            return res.status(400).json({message:'Failed To fetch Products according to category'})
        }
        
    } catch (error) {
        return res.status(401).json({Error:error.message})
    }
}

//Delete a product from database
const deleteProduct=async(req,res)=>{
    const productId=req.params.productId
    const pool=await mssql.connect(sqlConfig)
    const deleted=(await pool.request()
    .input('productId',productId)
    .execute('deleteProductProc'))
    if(deleted){
        return res.status(200).json({message:'Product deleted succesfully'})
    } else{
        return res.status(401).json({message:'Failed deleting Product'})
    }
}
module.exports={
    addProduct,updateProduct,viewOneProduct,viewAllproducts,viewProductsCategory,deleteProduct
}