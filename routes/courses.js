var express = require('express');
var router = express.Router();
const controller = require('../controllers/department.controller')
const passport = require('passport')

router.get('/level/:id',
  controller.getCoursesOfALevelSemester
)
router.post('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.createCourse
);
router.put('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.editCourse
);
router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.deleteCourse
);
module.exports = router;
