const validate =  require("validator");
const bcrypt =  require("bcrypt");

const _ = require("lodash");
const mongoose = require("../config/mongo").mongoose;
const utils = require("../helpers/utils");

var PollSchema = mongoose.Schema({
    pollName: {
        type: String,
        required: true
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

PollSchema.statics.getCreatorId = function(creatorId){
    return User.find({creatorId})
}

var Poll = mongoose.model("Polls", UserSchema, "Polls");

module.exports.Poll = Poll;