const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categories: {
        type: [
            {
                _id: false,
                category: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // images: [
    //     {
    //         _id: false,
    //         imageUrl: {
    //             type: String,
    //             required: true,
    //         },
    //     },
    // ],
    // anonymous: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
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
                    required: true,
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

module.exports = mongoose.model('Question', questionSchema);
