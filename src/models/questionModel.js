const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    numUpVote: {
        type: Number,
        default: 0,
    },
    userUpVote: [
        {
            _id: false,
            userID: {
                type: mongoose.Schema.Types.ObjectId,
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
                type: mongoose.Schema.Types.ObjectId,
                require: true,
            },
        },
    ],
});

module.exports = mongoose.model('Question', questionSchema);
