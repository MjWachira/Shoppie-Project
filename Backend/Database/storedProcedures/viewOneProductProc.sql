CREATE OR ALTER PROCEDURE viewOneProductProc(@productId VARCHAR(100))
AS 
BEGIN 
SELECT * FROM productTable 
WHERE productId=@productId
END;