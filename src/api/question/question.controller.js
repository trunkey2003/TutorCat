const { AppError } = require('../../common/errors/AppError');
const questionService = require('./question.service');
const upload = require('../../common/uploadFile/uploadFile');
module.exports = {
    getAllQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.getAllQuestion();
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    addQuestion: async (req, res, next) => {
        try {
            let imageUrls;
            if (req.files.length <= 10 && req.files.length >= 0) {
                imageUrls = await upload(req.files);
            } else if (req.files.length > 10) {
                next(new AppError(500, 'Too many files to upload.'));
            }
            let DTO = await questionService.addQuestion(imageUrls, req.user.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getQuestionWithID: async (req, res, next) => {
        try {
            let DTO = await questionService.getQuestionWithID(req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getQuestionWithUserID: async (req, res, next) => {
        try {
            let DTO = await questionService.getQuestionWithID(req.params.userid);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.deleteQuestion(req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    modifyQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.modifyQuestion(req.params.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    upVoteQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.upVoteQuestion(req.user.id, req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    downVoteQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.downVoteQuestion(req.user.id, req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getAllReply: async (req, res, next) => {
        try {
            let DTO = await questionService.getAllReply(req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteReply: async (req, res, next) => {
        try {
            let DTO = await questionService.deleteReply(req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    upVoteReply: async (req, res, next) => {
        try {
            let DTO = await questionService.upVoteReply(req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    downVoteReply: async (req, res, next) => {
        try {
            let DTO = await questionService.downVoteReply(req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
