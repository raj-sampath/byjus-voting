const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connection to Mongo DB successfull..");
    })
    .catch((err) => {
        console.log("Error Occured while connnecting to Mongo DB : ", JSON.stringify(err, undefined, 2));
    });

module.exports.mongoose = mongoose;