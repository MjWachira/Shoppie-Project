const mssql=require('mssql');
const { sqlConfig } = require('../../Config/config');

const createProductTable = async(req, res)=>{
    try {
        const table = `BEGIN
        TRY
            CREATE TABLE productTable(
                productId VARCHAR(200) PRIMARY KEY,
                productName VARCHAR(500) NOT NULL,
                productDescription VARCHAR(1000) NOT NULL,
                productClassification VARCHAR(100) NOT NULL,
                productCategory VARCHAR(100) NOT NULL,
                status BIT DEFAULT 0,
                stockNumber INT NOT NULL,
                boughtBy VARCHAR(100),
                productCost INT NOT NULL,
                earlyCost INT,
                userboughtEmailed BIT DEFAULT 0,
                emailAdminItemBought BIT DEFAULT 0,
                FOREIGN KEY (boughtBy) REFERENCES userTable (userId)
                ON DELETE SET NULL
                ON UPDATE CASCADE
            )
    
        END TRY
    BEGIN
        CATCH
            THROW 50001, 'Table already Exists!', 1;
        END CATCH`;

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
   createProductTable
}


