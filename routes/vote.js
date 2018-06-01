var express = require('express');
var router = express.Router();

const ObjectId = require("mongoose").Types.ObjectId;
const utils = require("../server/helpers/utils");
const _ = require("lodash");
const Vote = require("../server/models/vote").Vote;
const Poll = require("../server/models/poll").Poll;

router.get('/:pollId', function(req, res, next) {
    
});

router.post('/', function(req, res, next) {

    var user = req.userObj;
    var voteObj = _.pick(req.body, ["pollId", "option"]);
    voteObj.creatorId = user._id;

    try{
        var objectId = ObjectId(voteObj.pollId);
        if(utils.isNullOrUndefined(objectId))
            res.status(404).send(utils.genericFailure("Invalid Poll Id !!!"));
        else{
            Poll.getById(ObjectId(voteObj.pollId))
            .then((poll) => {
                if(utils.isNullOrUndefined(poll))
                    res.status(404).send(utils.genericFailure("Poll Not Found !!!"))
                else{
                    if(poll.options.indexOf(voteObj.option) > -1)
                        saveVoteObj(voteObj, res)
                    else{
                        poll.options.push(voteObj.option);
                        poll.save()
                            .then((savedPoll) => saveVoteObj(voteObj, res))
                            .catch((error) => res.status(500).send(utils.genericFailure("Server Error !!!")))
                    }
                }
            })
        }
    }
    catch(e){
        res.status(404).send(utils.genericFailure("Invalid Poll Id !!!"))
    }
});

function saveVoteObj(voteObj, res){
    var vote = Vote(voteObj);
    vote.save()
        .then((savedVote) => res.status(200).send(utils.genericCreateSuccess(Vote, savedVote)))
        .catch((error) => res.status(500).send(utils.genericCreateFailure(Vote)));
}


module.exports = router;