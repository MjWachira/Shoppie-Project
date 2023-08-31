import mssql from 'mssql'
import { addProduct, deleteProduct, updateProduct, viewAllproducts, viewProductsCategory } from './productController'

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}
describe("Tests for products controllers",()=>{
    describe("creating a product",()=>{
        it("Should Create a product",async()=>{
            const req={
                body:{
                    productName:"Black mamba",
                    productImg:"https://this.shoe.jpg",
                    productDescription:"better shoe for any weather",
                    productCost:"5600",
                    earlyCost:"6700", 
                    productCategory:"Shoes", 
                    productClassification:"men"
                }
            }

            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:[1],
                }),
            })
            await addProduct(req,res)

            expect(res.json).toHaveBeenCalledWith({
                message: "Product added Succesfully"})
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it("Should not Create a product in database",async()=>{
            const req={
                body:{}
            }

            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:[0],
                }),
            })
            await addProduct(req,res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                message: "Product adding failed"
            })
        })   
    })
    ///Test for Updating a product details
    describe("Updating a products details",()=>{
        it("Should update a products details",async()=>{
            const req={
                body:{
                    productName:"Black mamba",
                    productImg:"https://this.shoe.jpg",
                    productDescription:"better shoe for any weather",
                    productCost:"5600",
                    earlyCost:"6700", 
                    productCategory:"Shoes", 
                    productClassification:"men"
                },
                params:{
                    userId:"8uhdge734264"
                }
            }

            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:[1],
                })
            })
            await updateProduct(req,res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
        message: "Product Update Succesfully"
    })
        })
        //
        it("Should Not update a products details",async()=>{
            const req={
                body:{
                    productName:"Black mamba",
                    productImg:"https://this.shoe.jpg",
                    productDescription:"better shoe for any weather",
                    productCost:"5600",
                    earlyCost:"6700", 
                    productCategory:"Shoes", 
                    productClassification:"men"
                },
                params:{
                    mockId:"wrong Id"
                }
            }

            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:0,
                })
            })
            await updateProduct(req,res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
        message: "Product Update failed"})
        })
         })
         //Test to view all Products
         describe("test for viewing all products",()=>{
            it("Should display all products",async()=>{
                const mockupProducts=
                [
                    {
                      "productName": "Kong Kong ",
                      "productDescription": "kooooong kong",
                      "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693058030/wpek8plfdvbcaopfvgmm.jpg",
                      "productCost": 6700,
                      "earlyCost": 8900,
                      "productCategory": "Shoes",
                      "productClassification": "women",
                      "productId": "263d7ccf-8086-4189-a34a-be07d93c181d"
                    },
                    {
                      "productName": "High Heel",
                      "productDescription": "kong kongs",
                      "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693214650/pcjzwhnfenk7lroz63x4.jpg",
                      "productCost": 7800,
                      "earlyCost": 9000,
                      "productCategory": "Shoes",
                      "productClassification": "women",
                      "productId": "26ef6c8e-be26-4b48-870e-d6a8be2fa68e"
                    },
                    {
                      "productName": "Kenyan Chamge Jacket",
                      "productDescription": "leather jackets",
                      "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693073956/ujad8avpcroxaprhnnyt.jpg",
                      "productCost": 8000,
                      "earlyCost": 9000,
                      "productCategory": "Jackets",
                      "productClassification": "men",
                      "productId": "29563054-3f32-483b-a1ee-e1650cda61db"
                    }]
                const req={}
                jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                    request:jest.fn().mockReturnThis(),
                    execute:jest.fn().mockResolvedValueOnce({
                        recordset:mockupProducts,
                    })
                })
                await viewAllproducts(req,res)
                expect(res.status).toHaveBeenCalledWith(200)  
            })
         })
         //Test for displaying products according to category
         describe("Test for displaying products with category",()=>{
            it("Should display products in specific category",async()=>{
                const productsInShoeCategory={products:[
                    {
                      "productName": "Kong Kong ",
                      "productDescription": "kooooong kong",
                      "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693058030/wpek8plfdvbcaopfvgmm.jpg",
                      "productCost": 6700,
                      "earlyCost": 8900,
                      "productClassification": "women",
                      "productId": "263d7ccf-8086-4189-a34a-be07d93c181d"
                    },
                    {
                      "productName": "High Heel",
                      "productDescription": "kong kongs",
                      "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693214650/pcjzwhnfenk7lroz63x4.jpg",
                      "productCost": 7800,
                      "earlyCost": 9000,
                      "productClassification": "women",
                      "productId": "26ef6c8e-be26-4b48-870e-d6a8be2fa68e"
                    }]}
                const req={
                    params:{
                        productCategory:'Shoes'
                    }
                }

                jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                    request:jest.fn().mockReturnThis,
                    input:jest.fn().mockReturnThis(),
                    execute:jest.fn().mockResolvedValueOnce({
                        recordset:productsInShoeCategory
                    }) 
                })
                await viewProductsCategory(req,res)

                expect(res.status).toHaveBeenCalledWith(200)
               // expect(res.json).toHaveBeenCalledWith({message: "Here are products in your category",products})
        
            })
            it("Should not display any Products when un existing category is provided",async()=>{
                
                const mockProductsinCategory=[]
                const req={
                    params:{
                        productCategory:'Hoodies'
                    }
                }

                jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                    request:jest.fn().mockReturnThis,
                    input:jest.fn().mockReturnThis(),
                    execute:jest.fn().mockResolvedValueOnce({
                        recordset:'',
                    }) 
                }) 
                await viewProductsCategory(req,res)

                expect(res.status).toHaveBeenCalledWith(400)
            })
         })
         //Test for deleting a product from database using productId
         describe("Tests for deleting a product from database using its productid",()=>{
            it("Should delete a product from database using its productId",async()=>{
                const req={
                    params:{
                        mockProductId:"988hh7809j384"
                    }
                }
                
                jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                    request:jest.fn().mockReturnThis(),
                    input:jest.fn().mockReturnThis(),
                    execute:jest.fn().mockResolvedValueOnce({
                        rowsAffected:1,
                    })
                })
          await deleteProduct(req,res)
          expect(res.status).toHaveBeenCalledWith(200)
          expect(res.json).toHaveBeenCalledWith({message:'Product deleted succesfully'})
            })

            it("Should Not delete a product from database provided with productId",async()=>{
                const req={
                    params:{
                        mockProductId:"988hh7809j384"
                    }
                } 
                
                jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                    request:jest.fn().mockReturnThis(),
                    input:jest.fn().mockReturnThis(),
                    execute:jest.fn().mockResolvedValueOnce({
                        rowsAffected:0,
                    })
                })
          await deleteProduct(req,res)

          expect(res.status).toHaveBeenCalledWith(400)
          expect(res.json).toHaveBeenCalledWith({message:'Product deleted succesfully'})
        })

         })

})