var express = require('express');
var router = express.Router();
const controller = require('../controllers/question.controller')
const passport = require('passport')

router.get('/in-active/course/:id',
passport.authenticate('jwt',{session:false}),
  controller.getInactiveQuestionsOfACourse
)
router.get('/course/:id',
  controller.getQuestionsOfACourse
)
router.post('/user/:id',
	controller.createQuestion
);
router.post('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.createQuestionAdmin
);
router.post('/user/:id',
	controller.createQuestion
);
router.put('/activate/:id',
  passport.authenticate('jwt',{session:false}),
	controller.activateQuestion
);
router.put('/deactivate/:id',
  passport.authenticate('jwt',{session:false}),
	controller.deactivateQuestion
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
