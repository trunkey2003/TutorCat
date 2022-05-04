const router = require('express').Router();
const question = require('./question');
const auth = require('./auth/');

router.use('/question', question);
router.use('/auth', auth);

module.exports = router;
