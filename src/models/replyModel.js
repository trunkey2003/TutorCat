const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    questionID: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        require: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        require: true,
    },
    numUpVote: {
        type: Number,
        default: 0,
    },
    userUpVote: [
        {
            _id: false,
            userID: {
                type: Schema.Types.ObjectId,
                require: true,
            },
        },
    ],
    numDownVote: {
        type: Number,
        default: 0,
    },
    userDownVote: [
        {
            _id: false,
            userID: {
                type: Schema.Types.ObjectId,
                require: true,
            },
        },
    ],
});

module.exports = mongoose.model('Reply', replySchema);
