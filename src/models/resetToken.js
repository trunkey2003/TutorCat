const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    resetToken:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('resetToken',resetTokenSchema);