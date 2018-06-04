const constants = require("./constants");

const randomColor = require('randomcolor');
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    genericCreateSuccess: (Class, data) => {
        return  {
            status: constants.SUCCESS,
            message: constants.CREATED_SUCCESS_MESSAGE.replace("{CLASS_NAME}", Class.modelName),
            data
        }
    },
    genericCreateFailure: (Class) => {
        return {
            status: constants.FAILURE, 
            message: constants.CREATED_FAILURE_MESSAGE.replace("{CLASS_NAME}", Class.modelName)
        }
    },
    genericFetchSuccess: (Class, data) => {
        return  {
            status: constants.SUCCESS,
            message: constants.FETCH_SUCCESS_MESSAGE.replace("{CLASS_NAME}", Class.modelName),
            data
        }
    },
    genericFetchFailure: (Class) => {
        return {
            status: constants.FAILURE, 
            message: constants.FETCH_FAILURE_MESSAGE.replace("{CLASS_NAME}", Class.modelName)
        }
    },
    genericDeleteSuccess: (Class) => {
        return  {
            status: constants.SUCCESS,
            message: constants.DELETE_SUCCESS_MESSAGE.replace("{CLASS_NAME}", Class.modelName),
        }
    },
    genericDeleteFailure: (Class) => {
        return {
            status: constants.FAILURE, 
            message: constants.DELETE_FAILURE_MESSAGE.replace("{CLASS_NAME}", Class.modelName)
        }
    },
    genericSuccess: (data, message) => {
        return {
            status: constants.SUCCESS,
            message,
            data
        }
    },
    genericFailure: (message) => {
        return {
            status: constants.FAILURE,
            message
        }
    },
    isNullOrUndefined : (obj) => {
        if(obj == null || obj == undefined)
            return true;
        else
            return false;
    },
    generateToken: (obj) => jwt.sign(obj, process.env.JWT_SALT),
    validateToken: (token) => {
        try{
            return jwt.verify(token, process.env.JWT_SALT)
        }
        catch(e){
            return "Invalid Token";
        }
    },
    checkPassword: (hash, plainText) => bcrypt.compareSync(plainText, hash),
    getRandomColor: () => randomColor({format: "rgba", luminosity: "dark", alpha: 1}),
    cleanOtionsArray: (arrObj) => {
        var returnArrayObj = [];
        arrObj.forEach((element) => {
            if(_.trim(element) != "")
                returnArrayObj.push(element);
        });

        return _.uniq(returnArrayObj);
    }
}
