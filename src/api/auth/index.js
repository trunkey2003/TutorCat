const router = require('express').Router();
const authController = require('../auth/auth.controller');

router.post('/sign-in',authController.signIn);

router.post('/sign-up',authController.signUp);

router.post('/forget-password',authController.forgetPassword); 

router.post('/reset-password',authController.resetPassword);
module.exports = router;
