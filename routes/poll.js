var express = require('express');
var router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

const utils = require("../server/helpers/utils");
const _ = require("lodash");
const Poll = require("../server/models/poll").Poll;

router.get('/', function(req, res, next) {
    var user = req.userObj;
    Poll.getAll()
        .then((polls) => {
            polls.forEach((poll) => {
                if(poll.creatorId.toString() == user._id.toString() )
                    poll._doc.thisUser = true;
                else    
                    poll._doc.thisUser = false;
            });
            res.status(200).send(utils.genericFetchSuccess(Poll, polls));
        })
        .catch((error) => {
            res.status(500).send(utils.genericFetchFailure(Poll))
        });
});

router.get('/:_id', function(req, res, next) {
    var _id = req.params._id;
    var user = req.userObj;
    if(utils.isNullOrUndefined(_id)){
        res.status(401).send(utils.genericFailure("Invalid Request"))
    }
    else{
        try{
            var objId = ObjectId(_id);
            var user = req.userObj;
            Poll.findById(_id)
                .then((poll) => {
                    if(utils.isNullOrUndefined(poll))
                        res.status(404).send(utils.genericFailure("Poll Not Found"))
                    else{
                        if(poll.creatorId.toString() === user._id.toString())
                            poll._doc.thisUser = true;
                        else
                            poll._doc.thisUser = false;

                        res.status(200).send(utils.genericFetchSuccess(Poll, poll));
                    }
                })
                .catch((error) => {
                    res.status(500).send(utils.genericFailure("Server Error"))
                })
        }
        catch(e){
            res.status(401).send(utils.genericFailure("Invalid Resource Id"))
        }
    }
});

router.post('/', function(req, res, next) {
    var user = req.userObj;
    var pollObj = _.pick(req.body, ["pollName", "options"]);
    pollObj.creatorId = user._id;
    pollObj.options = utils.cleanOtionsArray(pollObj.options);

    if(pollObj.options.length == 0){
        res.status(400).send(utils.genericFailure("Please enter valid poll options"))
    }
    else{
        var poll = Poll(pollObj);
        poll.save()
            .then((createdPoll) => res.status(200).send(utils.genericCreateSuccess(Poll, createdPoll)))
            .catch((error) => {
                var errorMessage = "";
                if(error.code == 11000)
                    errorMessage = "Dupicate Polls not allowed !!!"
                else
                    errorMessage = error.message;
                res.status(500).send(utils.genericFailure(errorMessage))
            });
    }
});

router.delete('/:_id', function(req, res, next) {
    var _id = req.params._id;
    if(utils.isNullOrUndefined(_id)){
        res.status(401).send(utils.genericFailure("Invalid Request"))
    }
    else{
        try{
            var objId = ObjectId(_id);
            var user = req.userObj;
            Poll.findById(_id)
                .then((poll) => {
                    if(utils.isNullOrUndefined(poll))
                        res.status(404).send(utils.genericFailure("Resource Not Found!!!"));
                    else{
                        if(poll.creatorId.toString() === user._id.toString()){
                            Poll.deleteOne({_id})
                                .then(() => {
                                    res.status(200).send(utils.genericDeleteSuccess(Poll));
                                })
                                .catch((e) => {
                                    res.status(500).send(utils.genericFailure("Server Error !!!"));
                                })
                        }
                        else{
                            res.status(401).send(utils.genericFailure("Unauthorized !!!"));
                        }
                    }
                })
                .catch((e) => {
                    res.status(500).send(utils.genericFailure("Server Error !!!"));
                })

        }
        catch(e){
            res.status(401).send(utils.genericFailure("Invalid Resource Id"))
        }
    }

});




module.exports = router;