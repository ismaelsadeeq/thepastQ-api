const models = require('../models');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const login = async (req,res)=>{
  const data = req.body;
  const password = data.password;
  const user = await models.user.findOne(
    {
      where:{email:data.email},
    }
  );
  if(user){
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      responseData.message = "Incorrect passsword";
      responseData.status = false;
      responseData.data = null;
      return res.json(responseData);
    } else {
      const jwt_payload ={
        id:user.id,
      }
      await models.isLoggedOut.destroy({where:{userId:user.id}}) 
      const token = jwt.sign(jwt_payload,process.env.SECRET);
      user.password = null;
      return res.json(
        { "token":token,
          "data":user,
          "statusCode":200
        }
      )
    }
  } else {
    responseData.message = "No account found";
    responseData.status = false;
    responseData.data = null;
    return res.json(responseData);
  }
}
const logout = async (req,res)=>{
  await models.isLoggedOut.create({id:uuid.v4(),userId:req.user.id,status:true});
  res.json("logged out");
}

module.exports = {
  login,
  adminLogin,
  register,
  adminRegister,
  logout
}