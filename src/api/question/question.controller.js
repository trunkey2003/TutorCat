const { AppError } = require('../../common/errors/AppError');
const questionService = require('./question.service');
// const upload = require('../../common/uploadCloudinary/uploadCloudinary');
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
            let imageUrls = new Array(0);
            if (req.files) {
                if (req.files.length <= 10 && req.files.length > 0) {
                    // multipleImagePromise = await upload(req.files);
                    // imageUrls = (await Promise.all(multipleImagePromise)).map((item) => {
                    //     return { imageUrl: item.secure_url };
                    // });
                    imageUrls = req.files.map((item) => {
                        return { imageUrl: item.path };
                    });
                } else if (req.files.length > 10) {
                    next(new AppError(500, 'Too many files to upload.'));
                }
            }
            console.log(imageUrls);
            let DTO = await questionService.addQuestion(imageUrls, req.user.id, req.body);
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
    addReply: async (req, res, next) => {
        try {
            let DTO = await questionService.addReply(req.user.id, req.params.id, req.body);
            res.status(200).json(DTO);
        } catch (error) {
            next(error);
        }
    },
};
