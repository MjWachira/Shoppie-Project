const { resetRequest, resetPassword } = require("./resetContoller");
const { generateUniqueToken, saveResetTokenToDatabase, sendResetEmail, getTokenInfoFromDatabase } = require("./resetPasswordController");


const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('Tests for resetController', () => {
  describe('resetRequest', () => {
    it('should send a password reset email', async () => {
      const mockUserEmail = 'mahubali@gmail.com';

      jest.spyOn(generateUniqueToken, 'mockReturnValue').mockReturnValue('VA76B8');
      const mockSaveResetToken = saveResetTokenToDatabase.mockResolvedValue();
      const mockSendResetEmail = sendResetEmail.mockResolvedValue();

      const req = {
        body: { userEmail: mockUserEmail },
      };

      await resetRequest(req, res);

      expect(mockSaveResetToken).toHaveBeenCalledWith(mockUserEmail, 'VA76B8');
      expect(mockSendResetEmail).toHaveBeenCalledWith(mockUserEmail, 'VA76B8');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password reset email sent.' });
    });

    it('should handle error', async () => {
      jest.spyOn(generateUniqueToken, 'mockReturnValue').mockReturnValue('VA76B8');
      saveResetTokenToDatabase.mockRejectedValue({Error:error.message});

      const req = {
        body: { userEmail: 'mahubali@gmail.com' },
      };

      await resetRequest(req, res);

      expect(res.json).toHaveBeenCalledWith({ Error:error.message });
    });
  });

  describe('Tests for resetPassword', () => {
    it('should reset password with a valid token', async () => {
      const mockTokenInfo = {
        userEmail: 'mahubali@gmail.com.com',
        expiration: Date.now() + 3600000,
      };

      jest.spyOn(getTokenInfoFromDatabase, 'mockResolvedValue').mockResolvedValue(mockTokenInfo);
      const mockUpdatePassword = updatePasswordInDatabase.mockResolvedValue();
      const mockDeleteToken = deleteTokenFromDatabase.mockResolvedValue();

      const req = {
        params: { token: 'VA76B8' },
        body: { newPassword: '123456789' },
      };

      await resetPassword(req, res);

      expect(mockUpdatePassword).toHaveBeenCalledWith(mockTokenInfo.userEmail, '123456789');
      expect(mockDeleteToken).toHaveBeenCalledWith('VA76B8');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Password updated successfully.' });
    });

    it('should handle invalid token', async () => {
      getTokenInfoFromDatabase.mockResolvedValue(null);

      const req = {
        params: { token: 'invalidToken' },
        body: { newPassword: 'newpassword' },
      };

      await resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token.' });
    });

    it('should handle expired token', async () => {
      const expiredTokenInfo = {
        userEmail: 'mahubali@gmail.com',
        expiration: Date.now() - 3600000,
      };
      getTokenInfoFromDatabase.mockResolvedValue(expiredTokenInfo);

      const req = {
        params: { token: 'expiredToken' },
        body: { newPassword: 'newpassword' },
      };

      await resetPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token.' });
    });

    it('should handle error', async () => {
      jest.spyOn(getTokenInfoFromDatabase, 'mockRejectedValue').mockRejectedValue({Error:error.message});

      const req = {
        params: { token: 'validToken' },
        body: { newPassword: 'newpassword' },
      };

      await resetPassword(req, res);

      expect(res.json).toHaveBeenCalledWith({ Error:error.message });
    });
  });
});
