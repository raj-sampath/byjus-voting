const _ = require("lodash");
const User = require("../models/user").User;
const utils = require("../helpers/utils");


module.exports = (req, res, next) => {
    if(req.method === "PATCH")
        next()
    else{
        var token = req.header("x-auth");

        if(_.isNull(token))
            res.status(401).send("Invalid Token")
        else{
            var tokenObj = utils.validateToken(token);
            if(tokenObj === "Invalid Token")
                res.status(401).send("Invalid Token")
            else{
                console.log(tokenObj);
                User.getByEmail(tokenObj.email) // REeplace with Chache
                    .then((users) => {
                        if(users.length == 0)
                            res.status(401).send("Invalid Token")
                        else{
                            if(users[0]._id == tokenObj._id){
                                req.tokenObj = tokenObj;
                                req.userObj = users[0];

                                if(req.path === "/api/validate" && req.method === "GET")
                                    res.status(200).send(utils.genericSuccess("Valid Token"))
                                else
                                    next();
                            }
                            else
                                res.status(401).send("Invalid Token")
                        }
                    })
                    .catch((e) => res.status(500).send("Server Error"));
            }
        }
    }
}

