const Router=require('express')
const { addProduct, updateProduct, viewOneProduct, viewAllproducts, viewProductsCategory, deleteProduct } = require('../Contoller/productController')
const { tokenVerfying } = require('../Middleware/tokenVerify')

const productRoute=Router()

productRoute.post('/add',tokenVerfying, addProduct)
productRoute.put('/update/:productId',tokenVerfying, updateProduct)
productRoute.get('/viewOneProduct/:productId',tokenVerfying, viewOneProduct)
productRoute.get('/allProducts',tokenVerfying,viewAllproducts)
productRoute.get('/allProducts/:productCategory',tokenVerfying, viewProductsCategory)
productRoute.delete('/delete/:productId',tokenVerfying, deleteProduct)

module.exports={
    productRoute
}