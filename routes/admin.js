var express = require('express');
var router = express.Router();
const controller = require('../controllers/admin.controller')
const passport = require('passport')

router.post('/create',
  passport.authenticate('jwt',{session:false}),
	controller.createAdmin
);
router.put('/edit/:id',
  passport.authenticate('jwt',{session:false}),
	controller.editAdmin
);
router.delete('/delete',
  passport.authenticate('jwt',{session:false}),
	controller.deleteAdmin
);
router.get('/:id',
  passport.authenticate('jwt',{session:false}),
	controller.getAdmin
);
router.get('/all',
  passport.authenticate('jwt',{session:false}),
	controller.getAllAdmin
);
router.put('/reset-password',
  passport.authenticate('jwt',{session:false}),
	controller.resetAdminPassword
);
module.exports = router;
