var express = require('express');
var router = express.Router();
const controller = require('../controllers/department.controller')
const passport = require('passport')

router.get('/all',
  controller.getDepartments
)
router.get('/faculty/:id',
  controller.getDeparmentOfFaculty
)
router.post('/',
  passport.authenticate('jwt',{session:false}),
	controller.createDepartment
);
router.put('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.editDepartment
);
router.delete('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.deleteDepartment
);
module.exports = router;
