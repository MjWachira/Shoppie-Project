CREATE PROCEDURE updatePassword
  @userEmail NVARCHAR(255),
  @newPassword NVARCHAR(255)
AS
BEGIN
  UPDATE userTable
  SET userPassword = @newPassword
  WHERE userEmail = @userEmail;
END;
