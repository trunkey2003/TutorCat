const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questionID: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
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
                required: true,
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
                required: true,
            },
        },
    ],
    isChanged: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongoose.model('Reply', replySchema);
