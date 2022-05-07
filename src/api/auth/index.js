const router = require('express').Router();
const authController = require('../auth/auth.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { verifyAdmin } = require('../../middleware/verifyAdmin');

router.post('/sign-in', authController.signIn);

// router.get('/test-cookie',authController.testCookie);

router.post('/sign-up', authController.signUp);

router.get('/sign-out', authController.signOut);

router.post('/forget-password', authController.forgetPassword);

router.post('/reset-password', authController.resetPassword);

router.post('/update-password', verifyToken, authController.updatePassword);

// router.get('/token-test', verifyToken, authController.tokenTest);

// router.get('/getAllUsers', verifyAdmin, authController.getAllUsers)
module.exports = router;
