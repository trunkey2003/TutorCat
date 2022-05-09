const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const room = new Schema({
    userJob: {type : String, required : true},
    roomID: { type : String, require : true, unique : true},
    title: {type : String, maxlength: 100},
    language: {type : String},
    programmingLanguages : {type: [String]},
    userName1: { type: String, require : true, default : 'anonymous', maxlength: 30},
    userName2: { type: String, maxlength: 30},
    userID1: {type : String, require : true, default : ""},
    userID2: {type : String, require : true, default : ""},
    userCount: {
        type : Number,
        require : true,
        default : 0, 
        min : 0,
        max : 2
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('room', room);