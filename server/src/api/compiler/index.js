var router = require('express').Router();

const compilerController = require('./compiler.controller');

router.post('/submission/create-and-get-result', compilerController.createSubmission, compilerController.getSubmission);
router.get('/submission/get/:submissionId', compilerController.getSubmission);

module.exports = router;