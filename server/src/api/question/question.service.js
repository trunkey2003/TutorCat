const { AppError } = require('../../common/errors/AppError');
const Question = require('../../models/questionModel');

const Reply = require('../../models/replyModel');

module.exports = {
    getAllQuestion: async () => {
        try {
            let question = await Question.find().populate('userID', 'name');
            return {
                statusCode: 200,
                message: 'Get all question successfully',
                data: question,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    addQuestion: async (userID, body) => {
        try {
            let { title, content, categories } = body;
            console.log(categories);
            const question = new Question({
                userID,
                title,
                content,
                // anonymous,
                categories,
            });
            await question.save();
            return {
                statusCode: 200,
                message: 'Add question successfully',
                data: question.id,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getQuestionWithID: async (id) => {
        try {
            let question = await Question.findById(id).populate('userID', 'name');
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
            let question = await Question.find({ userID }).populate('userID', 'name');
            return {
                statusCode: 200,
                message: `Get questions with user ID: ${userID} successfully`,
                data: question,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    deleteQuestion: async (userID, id) => {
        try {
            let question = await Question.findById(id);
            if (question.userID.toString() !== userID) throw new AppError(409, 'Conflict userID');
            await Question.deleteOne({ id });
            return {
                statusCode: 200,
                message: `Delete question with question ID: ${id} successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    modifyQuestion: async (userID, id, body) => {
        try {
            let { title, content, categories } = body;
            // console.log(body);
            let question = await Question.findById(id);
            if (question.userID.toString() !== userID.toString()) throw new AppError(409, 'Conflict userID');
            if (title) {
                question.title = title;
                question.isChanged = 1;
            }
            if (content) {
                question.content = content;
                question.isChanged = 1;
            }
            if (categories) {
                question.categories = categories;
                question.isChanged = 1;
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
            let question = await Question.findById(questionID);
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
            console.log(question);
            return {
                statusCode: 200,
                message: `Question with id ${questionID} ${res} 1 up vote successfully`,
                data: question.numUpVote - question.numDownVote,
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
                data: question.numUpVote - question.numDownVote,
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
    deleteReply: async (userID, replyID) => {
        try {
            let question = await Question.findById(userID);
            if (question.userID.toString() !== userID.toString()) throw new AppError(409, 'Conflict userID');
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
            if (!userUpVote.length) {
                reply.numUpVote++;
                reply.userUpVote.push({
                    userID: userID,
                });
                let userDownVote = reply.userDownVote.filter((item) => {
                    return item.userID.toString() === userID.toString();
                });
                if (userDownVote.length) {
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
                data: reply.numUpVote - reply.numDownVote,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    downVoteReply: async (userID, replyID) => {
        try {
            let reply = await Reply.findById(replyID);
            let userDownVote = reply.userDownVote.filter((item) => {
                return item.userID.toString() === userID.toString();
            });
            let res = '';
            if (!userDownVote.length) {
                reply.numDownVote++;
                reply.userDownVote.push({
                    userID: userID,
                });
                let userUpVote = reply.userUpVote.filter((item) => {
                    return item.userID.toString() === userID.toString();
                });
                if (userUpVote.length) {
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
                data: reply.numUpVote - reply.numDownVote,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    addReply: async (userID, questionID, { content }) => {
        try {
            let reply = new Reply({
                userID,
                questionID,
                content,
            });
            await reply.save();
            return {
                statusCode: 200,
                message: `Created reply successfully`,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    modifyReply: async (userID, replyID, body) => {
        try {
            let { content } = body;
            // console.log(body);
            let reply = await Reply.findById(replyID);
            if (reply.userID.toString() !== userID.toString()) throw new AppError(409, 'Conflict userID');
            if (content) {
                reply.content = content;
                reply.isChanged = 1;
            }
            await reply.save();
            return {
                statusCode: 200,
                message: 'Modify reply successfully',
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getCatalogue: async () => {
        try {
            let catalogue = await Question.find().distinct('categories.category');
            return {
                statusCode: 200,
                message: 'Modify reply successfully',
                data: catalogue,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
    getQuestionWithCategory: async (category) => {
        try {
            let question = await Question.find({ 'categories.category': category });
            return {
                statusCode: 200,
                message: 'Modify reply successfully',
                data: question,
            };
        } catch (error) {
            throw new AppError(500, error.message);
        }
    },
};