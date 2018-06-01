const validate =  require("validator");
const bcrypt =  require("bcrypt");

const _ = require("lodash");
const mongoose = require("../config/mongo").mongoose;
const utils = require("../helpers/utils");

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [validate.isEmail, "Invalid Email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        accessType: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var tokenObj = _.pick(user, ["_id",  "email"]);

    if(user.tokens !=null || user.tokens.lenght > 0)
        user.tokens.pop();

    var token = utils.generateToken(tokenObj);
    user.tokens.push({token, accessType: "auth"});
}

UserSchema.methods.encryptPassword = function(){
    var user = this;
    var password = this.password;

    var salt = bcrypt.genSaltSync(_.toInteger(process.env.SALT_ROUNDS));
    var hash = bcrypt.hashSync(password, salt);

    user.password = hash;
}

UserSchema.statics.trimUser = function(dbUserObj){
    return _.pick(dbUserObj, ["_id", "email"]);
}

UserSchema.statics.getByEmail = function(email){
    return User.find({email})
}

var User = mongoose.model("Users", UserSchema, "Users");

module.exports.User = User;