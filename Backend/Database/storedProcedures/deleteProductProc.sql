CREATE OR ALTER PROCEDURE deleteProductProc(@productId VARCHAR(100))
AS 
BEGIN 
DELETE FROM productTable
WHERE productId=@productId
END;