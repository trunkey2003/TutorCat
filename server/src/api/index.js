const router = require('express').Router();
const question = require('./question');
const auth = require('./auth/');
const user = require('./user/');
const room = require('./room/');
const compiler = require('./compiler');

router.use('/question', question);
router.use('/auth', auth);
router.use('/user', user);
router.use('/room', room);
router.use('/compiler', compiler);

module.exports = router;
