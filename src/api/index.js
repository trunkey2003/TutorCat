const router = require('express').Router();
const auth = require('../api/auth/index');

router.use('/auth',auth);

module.exports = router;