const validate =  require("validator");
const bcrypt =  require("bcrypt");

const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("../config/mongo").mongoose;
const utils = require("../helpers/utils");

var VoteSchema = mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Polls"
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
});

VoteSchema.statics.getByPollId = function(pollId){
    var aggCondition = [
        {
            $match: {
                pollId: ObjectId(pollId)
            }
        },
        {
            $group: {
                _id: "$option",
                count: {$sum: 1}
            }
        }
    ];
    return Vote.aggregate(aggCondition);
}

var Vote = mongoose.model("Votes", VoteSchema, "Votes");

module.exports.Vote = Vote;