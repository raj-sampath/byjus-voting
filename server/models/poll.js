const validate =  require("validator");
const bcrypt =  require("bcrypt");

const _ = require("lodash");
const mongoose = require("../config/mongo").mongoose;
const utils = require("../helpers/utils");

var PollSchema = mongoose.Schema({
    pollName: {
        type: String,
        required: true,
        unique: true
    },
    options: {
        type: [String],
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
});

PollSchema.statics.getAll = function(){
    return Poll.find({})
}

PollSchema.statics.getById = function(_id){
    return Poll.findById(_id)
}

var Poll = mongoose.model("Polls", PollSchema, "Polls");

module.exports.Poll = Poll;