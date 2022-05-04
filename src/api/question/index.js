const router = require('express').Router();
const questionController = require('./question.controller');
const upload = require('../../middleware/uploadFile');

router.get('/', questionController.getAllQuestion);
router.get('/:id', questionController.getQuestionWithID);
router.get('/user/:userid', questionController.getQuestionWithUserID);
router.post('/add', upload, questionController.addQuestion);
router.delete('/:id/delete', questionController.deleteQuestion);
router.put('/:id/modify', questionController.modifyQuestion);
router.post('/:id/up-vote', questionController.upVoteQuestion);
router.post('/:id/down-vote', questionController.downVoteQuestion);
router.get('/:id/reply', questionController.getAllReply);
router.post('/:id/reply/delete', questionController.deleteReply);
router.post('/reply/:id/up-vote', questionController.upVoteReply);
router.post('/reply/:id/down-vote', questionController.downVoteReply);

module.exports = router;
