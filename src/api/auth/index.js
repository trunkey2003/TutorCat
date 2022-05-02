const router = require('express').Router();
const authController = require('../auth/auth.controller');
const {verifyToken} = require("../../middleware/verifyToken");

router.post('/sign-in',verifyToken,authController.signIn);

router.post('/sign-up',authController.signUp);

router.post('/forget-password',authController.forgetPassword); 

router.post('/reset-password',authController.resetPassword);
module.exports = router;
