const mssql=require('mssql');
const { sqlConfig } = require('../../Config/config');


const createCart= async(req, res)=>{
    try {
        const table = `BEGIN 
        TRY 
        CREATE TABLE productCart(
            productId VARCHAR(100) PRIMARY KEY,
            productName VARCHAR(100) NOT NULL,
            productCost INT NOT NULL,
            productImg VARCHAR(200),
            subTotal INT,
            boughtBy VARCHAR(100),
            FOREIGN KEY(boughtBy) REFERENCES userTable (userId)
        )
        END TRY 
        BEGIN 
        CATCH 
        THROW 50001,'Table has already been created',1
        END 
        CATCH;`;

    const pool = await mssql.connect(sqlConfig)
    await pool.query(table, (err)=>{
        if(err instanceof mssql.RequestError){  
            console.log({Error: err.message});
        }
        else{
            
        }
    })

    } catch (error) {
        return res({Error: error})
    }
}


module.exports={
   createCart
}