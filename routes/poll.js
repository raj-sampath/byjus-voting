var express = require('express');
var router = express.Router();

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

router.post('/', function(req, res, next) {
    var user = req.userObj;
    var pollObj = _.pick(req.body, ["pollName", "options"]);
    pollObj.creatorId = user._id;

    var poll = Poll(pollObj);
    poll.save()
        .then((createdPoll) => {
            res.status(200).send(utils.genericCreateSuccess(Poll, createdPoll));
        })
        .catch((error) => res.status(500).send(utils.genericCreateFailure(Poll)))
    
});




module.exports = router;