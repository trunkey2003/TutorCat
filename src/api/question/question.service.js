const { AppError } = require('../../common/errors/AppError');
const upload = require('../../common/uploadFile/uploadFile');
const Question = require('../../models/questionModel');

const Reply = require('../../models/replyModel');

module.exports = {
    getAllQuestion: async () => {
        try {
            let question = await Question.find();
            return {
                statusCode: 200,
                message: 'Get all question successfully',
                data: question,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    addQuestion: async (imageUrl, userID, body) => {
        try {
            let { title, content, anonymous } = body;
            const question = new Question({
                userID,
                title,
                content,
                anonymous,
            });

            await question.save();
            return {
                statusCode: 200,
                message: 'Add question successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getQuestionWithID: async (id) => {
        try {
            let question = await Question.findById({ id });
            return {
                statusCode: 200,
                message: `Get question ${id} detailed successfully`,
                data: question,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getQuestionWithUserID: async (userID) => {
        try {
            let question = await Question.find({ userID });
            return {
                statusCode: 200,
                message: `Get questions with user ID: ${userID} successfully`,
                data: question,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    deleteQuestion: async (id) => {
        try {
            await Question.deleteOne({ id });
            return {
                statusCode: 200,
                message: `Delete question with question ID: ${id} successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    modifyQuestion: async (id, body) => {
        try {
            let { title, content } = body;
            let question = Question.findById(id);
            if (title) {
                question.title = title;
            }
            if (content) {
                question.content = content;
            }
            await question.save();
            return {
                statusCode: 200,
                message: 'Modify question with ID successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    upVoteQuestion: async (userID, questionID) => {
        try {
            let question = Question.findById(questionID);
            let userUpVote = question.userUpVote.filter((item) => {
                return item.userID.toString() === userID.toString();
            });
            let res = '';
            if (!userUpVote.length) {
                question.numUpVote++;
                question.userUpVote.push({
                    userID: userID,
                });
                let userDownVote = question.userDownVote.filter((item) => {
                    return item.userID.toString() === userID.toString();
                });
                if (userDownVote.length) {
                    question.numDownVote--;
                    question.userDownVote = question.userDownVote.filter((item) => {
                        return item.userID.toString() !== userID.toString();
                    });
                }
                res = 'added';
            } else {
                question.numUpVote--;
                question.userUpVote = question.userUpVote.filter((item) => {
                    return item.userID.toString() !== userID.toString();
                });
                res = 'removed';
            }
            await question.save();
            return {
                statusCode: 200,
                message: `Question with id ${questionID} ${res} 1 up vote successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    downVoteQuestion: async (userID, questionID) => {
        try {
            let question = await Question.findById(questionID);
            let userDownVote = question.userDownVote.filter((item) => {
                return item.userID.toString() === userID.toString();
            });
            let res = '';
            if (!userDownVote.length) {
                question.numDownVote++;
                question.userDownVote.push({
                    userID: userID,
                });
                let userUpVote = question.userUpVote.filter((item) => {
                    return item.userID.toString() === userID.toString();
                });
                if (userUpVote.length) {
                    question.numUpVote--;
                    question.userUpVote = question.userUpVote.filter((item) => {
                        return item.userID.toString() !== userID.toString();
                    });
                }
                res = 'added';
            } else {
                question.numDownVote--;
                question.userDownVote = question.userDownVote.filter((item) => {
                    return item.userID.toString() !== userID.toString();
                });
                res = 'removed';
            }
            await question.save();
            return {
                statusCode: 200,
                message: `Question with id ${questionID} ${res} 1 down vote successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getAllReply: async (questionID) => {
        try {
            let reply = (await Reply.find()).filter((item) => {
                return item.questionID.toString() === questionID.toString();
            });
            return {
                statusCode: 200,
                message: `Get all reply from question with id ${questionID}`,
                data: reply,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    deleteReply: async (replyID) => {
        try {
            await Reply.deleteOne({ id: replyID });
            return {
                statusCode: 200,
                message: `Delete reply ${replyID} successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    upVoteReply: async (userID, replyID) => {
        try {
            let reply = Reply.findById(replyID);
            let userUpVote = reply.userUpVote.filter((item) => {
                return item.userID.toString() === userID.toString();
            });
            let res = '';
            if (!userUpVote.size()) {
                reply.numUpVote++;
                reply.userUpVote.push({
                    userID: userID,
                });
                let userDownVote = reply.userDownVote.filter((item) => {
                    return item.userID.toString() === userID.toString();
                });
                if (userDownVote.size()) {
                    reply.numDownVote--;
                    reply.userDownVote = reply.userDownVote.filter((item) => {
                        return item.userID.toString() !== userID.toString();
                    });
                }
                res = 'added';
            } else {
                reply.numUpVote--;
                reply.userUpVote = reply.userUpVote.filter((item) => {
                    return item.userID.toString() !== userID.toString();
                });
                res = 'removed';
            }
            await reply.save();
            return {
                statusCode: 200,
                message: `Reply with id ${replyID} ${res} 1 up vote successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    downVoteQuestion: async (userID, replyID) => {
        try {
            let reply = await Reply.findById(replyID);
            let userDownVote = reply.userDownVote.filter((item) => {
                return item.userID.toString() === userID.toString();
            });
            let res = '';
            if (!userDownVote) {
                reply.numDownVote++;
                reply.userDownVote.push({
                    userID: userID,
                });
                let userUpVote = reply.userUpVote.filter((item) => {
                    return item.userID.toString() === userID.toString();
                });
                if (userUpVote) {
                    reply.numUpVote--;
                    reply.userUpVote = reply.userUpVote.filter((item) => {
                        return item.userID.toString() !== userID.toString();
                    });
                }
                res = 'added';
            } else {
                reply.numDownVote--;
                reply.userDownVote = reply.userDownVote.filter((item) => {
                    return item.userID.toString() !== userID.toString();
                });
                res = 'removed';
            }
            await reply.save();
            return {
                statusCode: 200,
                message: `Reply with id ${replyID} ${res} 1 down vote successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};
