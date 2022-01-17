var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    walker:"Hey you shouldn't be here but you are anyway",
    thepastQ:"api"
  });
});

module.exports = router;
