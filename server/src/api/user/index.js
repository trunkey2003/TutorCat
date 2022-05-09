const router = require('express').Router();
const userController = require('./user.controller');
const { verifyToken } = require('../../middleware/verifyToken');

router.get('/get-Info', verifyToken, userController.getInfo);

module.exports = router;
