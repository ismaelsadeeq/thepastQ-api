var express = require('express');
var router = express.Router();
const controller = require('../controllers/level.controller')
const passport = require('passport')

router.get('/department/:id',
  controller.getLevelsOfADept
)
router.post('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.createLevel
);
router.put('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.editLevel
);
router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.deleteLevel
);
module.exports = router;
