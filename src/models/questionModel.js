const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
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
    images: [
        {
            _id: false,
            imageUrl: {
                type: String,
                require: true,
            },
        },
    ],
    anonymous: {
        type: Boolean,
        require: true,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    numUpVote: {
        type: Number,
        default: 0,
    },
    userUpVote: {
        type: [
            {
                _id: false,
                userID: {
                    type: Schema.Types.ObjectId,
                    require: true,
                },
            },
        ],
    },
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

module.exports = mongoose.model('Question', questionSchema);
