CREATE OR ALTER PROCEDURE viewProductWithCategory(@productCategory VARCHAR(50))
AS 
BEGIN 
SELECT productName,productDescription,productImg,productCost,earlyCost,productClassification,productId FROM productTable
WHERE productCategory=@productCategory
END;