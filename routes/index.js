var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/login.html");
});

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.redirect("/dashboard.html");
});

module.exports = router;
