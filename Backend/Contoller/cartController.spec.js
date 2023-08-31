import mssql from 'mssql'
import { addToCart, removeAllFromCart, removeOneFromCart, viewCart } from './cartController'


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}

describe("Tests for cart controller",()=>{
    describe("Tests for adding product to cart",()=>{

    
    it("Should add product to cart",async()=>{
    const req={
        body:{
            productId:"jju88y8uhu",
            productName:"Black Mamba",
            productCost:8900,
            productImg:"https://productimg.jpg",
            boughtBy:"j8yug87"
        }
     }
     jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:1,
        })
     })

     await addToCart(req,res)

     expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message:"Product Added to Cart"})
    })

    it("Should not add product to cart without bought By which is userId",async()=>{
        const req={
            body:{ }
         }
         jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(), 
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce(null) 
         })
    
         await addToCart(req,res)
    
         expect(res.status).toHaveBeenCalledWith(404)
   
        })
    })
//test to view Cart
    describe("Tests for viewing cart",()=>{
        it("Should display all cart items for a specific user",async()=>{
            const mockCartItems=[
                {
                  "productId": "65b53e6f-28f5-428c-9736-8dd218068468",
                  "productName": "Oxford Shoe",
                  "productCost": "7000",
                  "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693073274/tew83sze1vk6g3dh8cgs.jpg",
                  "subTotal": "14500",
                  "boughtBy": "b26f14df-7537-44d6-a29f-47ec6992ed49" 
                },
                {
                  "productId": "78554fa6-d91e-4ae7-958d-02cf8547dfd1",
                  "productName": "Kenya Black Mamba",
                  "productCost": "7800",
                  "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693073363/omdxauexochnvmgzp5gp.jpg",
                  "subTotal": "6700",
                  "boughtBy": "b26f14df-7537-44d6-a29f-47ec6992ed49"
                },
                {
                  "productId": "dde708ff-1827-4916-941e-18e2d7eccd49",
                  "productName": "Kong Kong ",
                  "productCost": "6700",
                  "productImg": "http://res.cloudinary.com/dkgtf3hhj/image/upload/v1693058030/wpek8plfdvbcaopfvgmm.jpg",
                  "subTotal": null,
                  "boughtBy": "b26f14df-7537-44d6-a29f-47ec6992ed49"
                }
              ]
           const req={
                params:{
                    userId:"b26f14df-7537-44d6-a29f-47ec6992ed49"
                }
            }
            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    recordset:mockCartItems
                })
            })
            
            await viewCart(req,res)

            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    //Test for deleting a cart item
    describe("Test for deleting a cart Item",()=>{
it("Should delete a cart item",async()=>{
    const req={
        params:{
            productId:'83ueju3838838fgg'
        }
    }

    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:1, })
    })
await removeOneFromCart(req,res)

expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message:'Item Removed from cart'})

})
it("Should Not delete a cart item",async()=>{
    const req={
        params:{
            productId:''
        }
    }

    jest.spyOn(mssql,"connect").mockResolvedValueOnce({
        request:jest.fn().mockReturnThis(),
        input:jest.fn().mockReturnThis(),
        execute:jest.fn().mockResolvedValueOnce({
            rowsAffected:0,})
    })
await removeOneFromCart(req,res)

expect(res.status).toHaveBeenCalledWith(404)


    })
})
//Test to clear cart
describe("Test for clearing the cart using userId",()=>{
    it("Should clear the cart",async()=>{
        const req={
            params:{
                userId:'9u678uuu9ju'
            }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce({})
        })
        await removeAllFromCart(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:"Removed all Items From the cart"})
    })
    it("Should Not Clear cart after receiving wrong userId or empty userId",async()=>{
        const req={
            params:{
                userId:''
            }
        }
        jest.spyOn(mssql,"connect").mockResolvedValueOnce({
            request:jest.fn().mockReturnThis(),
            input:jest.fn().mockReturnThis(),
            execute:jest.fn().mockResolvedValueOnce(null)
        })
        await removeAllFromCart(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({message:"Failed to Remove Items from cart"})
    })
})
})
