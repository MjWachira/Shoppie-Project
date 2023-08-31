CREATE OR ALTER PROCEDURE userLoginProc(@userEmail VARCHAR(100))
AS 
BEGIN 
SELECT * FROM userTable
WHERE userEmail=@userEmail
END; 