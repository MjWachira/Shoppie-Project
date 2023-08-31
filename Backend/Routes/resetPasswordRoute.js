const Router=require('express');
const { resetPassword, resetRequest } = require('../Contoller/resetContoller');
const resetRoute=Router()


resetRoute.post('/reset-password',resetRequest );

resetRoute.post('/reset-password/:token',resetPassword );

  
  module.exports={
    resetRoute
  }