BEGIN
    TRY
        CREATE TABLE productTable(
            productId VARCHAR(200) PRIMARY KEY,
            productName VARCHAR(500) NOT NULL,
            productDescription VARCHAR(1000) NOT NULL,
            productClassification VARCHAR(100) NOT NULL,
            productCategory VARCHAR(100) NOT NULL,
            productImg VARCHAR(MAX),
            stockNumber INT ,
            productCost INT NOT NULL,
            earlyCost INT
        )

    END TRY
BEGIN
    CATCH
        THROW 50001, 'Table already Exists!', 1;
    END CATCH 

