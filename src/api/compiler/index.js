var router = require('express').Router();

const compilerController = require('./compiler.controller');

router.post('/submission/create-and-get-result', compilerController.createSubmission, compilerController.getSubmission);
router.get('/submission/get/:submissionId', compilerController.getSubmission);
router.get('/submission/test', (req, res, next) => {res.send("hello");})

module.exports = router;