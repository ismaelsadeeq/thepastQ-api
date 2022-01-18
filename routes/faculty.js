var express = require('express');
var router = express.Router();
const controller = require('../controllers/faculty.controller')
const passport = require('passport')

router.get('/all',
  controller.getFaculties
)
router.post('/',
  passport.authenticate('jwt',{session:false}),
	controller.createFaculty
);
router.put('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.editFaculty
);
router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.deleteFaculty
);
module.exports = router;
