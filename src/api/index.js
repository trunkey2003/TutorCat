const router = require('express').Router();
const question = require('./question');

router.use('/question', question);

module.exports = router;
