const router = require('express').Router();
const authController = require('../auth/auth.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { verifyAdmin } = require('../../middleware/verifyAdmin');

router.post('/sign-in', authController.signIn);

router.post('/sign-up', authController.signUp);

router.delete('/sign-out', authController.signOut);

router.post('/forget-password', authController.forgetPassword);

router.post('/reset-password', authController.resetPassword);

router.post('/update-password', verifyToken, authController.updatePassword);
module.exports = router;
