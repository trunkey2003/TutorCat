const router = require('express').Router();
const questionController = require('./question.controller');
const upload = require('../../middleware/uploadFile');
const { verifyToken } = require('../../middleware/verifyToken');

router.get('/', questionController.getAllQuestion);
router.get('/detail/:id', questionController.getQuestionWithID);
router.get('/user/', verifyToken, questionController.getQuestionWithUserID);
router.post('/add', verifyToken, upload, questionController.addQuestion);
router.delete('/:id/delete', verifyToken, questionController.deleteQuestion);
router.patch('/:id/modify', verifyToken, questionController.modifyQuestion);
router.post('/:id/up-vote', verifyToken, questionController.upVoteQuestion);
router.post('/:id/down-vote', verifyToken, questionController.downVoteQuestion);
router.get('/:id/reply', questionController.getAllReply);
router.post('/:id/reply/add', verifyToken, questionController.addReply);
router.post('/:id/reply/delete', verifyToken, questionController.deleteReply);
router.post('/reply/:id/up-vote', verifyToken, questionController.upVoteReply);
router.post('/reply/:id/down-vote', verifyToken, questionController.downVoteReply);

module.exports = router;
