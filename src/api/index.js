const router = require('express').Router();
const question = require('./question');
const auth = require('./auth/');
const user = require('./user');

router.use('/question', question);
router.use('/auth', auth);
router.use('/user', user);

module.exports = router;
