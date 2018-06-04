var express = require('express');
var router = express.Router();

const utils = require("../server/helpers/utils");
const _ = require("lodash");
const User = require("../server/models/user").User;

router.patch('/register', function(req, res, next) {
  var userObj = _.pick(req.body, ["email", "password"]);

  if(utils.isNullOrUndefined(userObj.password) 
      || userObj.password == "" 
      || userObj.password.length < 6){
        res.status(500).send(utils.genericFailure("Password should be minimum 6 characters long"))
  }
  else {
    var user = User(userObj);
    user.generateAuthToken();
    user.encryptPassword();
  
    user.save()
      .then((createdUser) => {
        var responseObj = utils.genericCreateSuccess(User, User.trimUser(createdUser));
        res.status(200).header("x-auth", createdUser.tokens[0].token).send(responseObj)
      })
      .catch((error) => {
  
        var errorMessage = "";
  
        if(error.code == 11000)
          errorMessage = "Email already exists"
        else{
          errorMessage = error.message;
        }
  
        res.status(500).send(utils.genericFailure(errorMessage))
      });
  }
});

router.patch('/login', function(req, res, next) {
  var userObj = _.pick(req.body, ["email", "password"]);

  User.getByEmail(userObj.email)
    .then((user) => {

      if(user.length > 0){
        if(utils.checkPassword(user[0].password, userObj.password)){
          user[0].generateAuthToken();
          user[0].save()
            .then((savedUser) => {
              var responseObj = utils.genericFetchSuccess(User, User.trimUser(savedUser));
              res.status(200).header("x-auth", savedUser.tokens[0].token).send(responseObj)
            })
            .catch((error) => {
              res.status(500).send(utils.genericFailure(error.message))
            })
        }
      }
      else
        res.status(404).send(utils.genericFetchFailure(User))
    })
});

module.exports = router;
