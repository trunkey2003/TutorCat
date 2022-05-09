const { AppError } = require('../../common/errors/AppError');
const questionService = require('./question.service');
// const upload = require('../../common/uploadCloudinary/uploadCloudinary');
module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            if (req.file) {
                res.status(200).json({
                    statusCode: 200,
                    message: 'Uploaded successfully',
                    data: req.file.path,
                });
            }
            next(new AppError(500, 'Upload failed'));
        } catch (error) {
            next(error);
        }
    },
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
            let DTO = await questionService.addQuestion(req.user.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            console.log(error);
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
            let DTO = await questionService.getQuestionWithID(req.user.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    deleteQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.deleteQuestion(req.user.id, req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    modifyQuestion: async (req, res, next) => {
        try {
            let DTO = await questionService.modifyQuestion(req.user.id, req.params.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            console.log(error);
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
            let DTO = await questionService.deleteReply(req.user.id, req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    upVoteReply: async (req, res, next) => {
        try {
            let DTO = await questionService.upVoteReply(req.user.id, req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    downVoteReply: async (req, res, next) => {
        try {
            let DTO = await questionService.downVoteReply(req.user.id, req.params.id);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    addReply: async (req, res, next) => {
        try {
            let DTO = await questionService.addReply(req.user.id, req.params.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    modifyReply: async (req, res, next) => {
        try {
            let DTO = await questionService.modifyReply(req.user.id, req.params.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getCatalogue: async (req, res, next) => {
        try {
            let DTO = await questionService.getCatalogue();
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    getQuestionWithCategory: async (req, res, next) => {
        try {
            let DTO = await questionService.getQuestionWithCategory(req.params.category);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
