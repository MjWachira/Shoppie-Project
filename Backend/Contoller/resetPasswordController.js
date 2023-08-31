const mssql = require('mssql');
const bcrypt=require('bcrypt')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv=require('dotenv')
dotenv.config()
const { sqlConfig } = require('../Config/config');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port:587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  }
});

// This is a function for generating unique Token
const generateUniqueToken=()=> {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

/////FUNCTION TO SAVE TOKEN TO THE DATABASE
const saveResetTokenToDatabase=async(userEmail, resetToken, expiration)=> {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('userEmail', mssql.NVarChar(255), userEmail)
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .input('expiration', mssql.DateTime, new Date(expiration))
    .execute('createResetToken');
}


//UPDATING PASSWORD IN DATABASE
const updatePasswordInDatabase=async(userEmail, newPassword)=> {

  const hashedPwd=await bcrypt.hash(newPassword, 8)
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('userEmail', mssql.NVarChar(255), userEmail)
    .input('newPassword', mssql.NVarChar(255), hashedPwd)
    .execute('updatePassword');
}

//FUNCTION FOR DELETING THE RESET TOKEN FROM DATABASE AFTER ONE HOUR IS DONE
const deleteTokenFromDatabase=async(resetToken)=> {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .execute('deleteResetToken');
}

//FUNCTION FOR GETTING THE TOKEN INFROMATION FROM FROM DATABASE
const getTokenInfoFromDatabase=async(resetToken)=> {
  const pool = await mssql.connect(sqlConfig);
  const result = await pool.request()
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .query('EXEC getTokenInfo @resetToken');
  
  if (result.recordset.length > 0) {
    return result.recordset[0];
  }
  
  return null;
}

//FUNCTION TO SEND AN EMAIL
const sendResetEmail=async(userEmail, resetLink)=> {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `Password Reset Request for ${userEmail}`,
    text: `Here is your password reset code: ${resetLink}. Use it within one hour.if you did not request to reset your password, kindly ignore`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}




module.exports = {
  saveResetTokenToDatabase,
  updatePasswordInDatabase,
  deleteTokenFromDatabase,
  getTokenInfoFromDatabase,
  generateUniqueToken,
  sendResetEmail
};
