var config = require("./config.json");

var env = process.env.NODE_ENV || "development";

if(env === "development" || env === "test"){
    var thisConfig = config[env];
    var keys = Object.keys(thisConfig);
    keys.forEach((key) => {
        process.env[key] = thisConfig[key];
        console.log(`${key} : ${process.env[key]}`)
    })
}

console.log("Starting on ENV : ", process.env.NODE_ENV);

