var express = require('express');
var router = express.Router();
const controller = require('../controllers/department.controller')
const passport = require('passport')

router.get('/course/:id',
  controller.getQuestionsOfACourse
)
router.post('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.createQuestion
);
router.put('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.editQuestion
);
router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.deleteQuestion
);
module.exports = router;
