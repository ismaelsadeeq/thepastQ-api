const models = require('../models');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const responseData = {
	status: true,
	message: "Completed",
	data: null
}

const createAdmin = async (req,res)=>{
  const data = req.body;
  if(!data){
    responseData.message = "data is required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const accountExist = await models.user.findOne(
    {
      where:{
        email:data.email
      }
    }
  );
  if(accountExist){
    responseData.message = "account already exist sign in";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync("password",salt)
  const admin = await models.user.create(
    {
      id:uuid.v4(),
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName,
      password:hash
    }
  )
  if(!admin){
    responseData.message = "you have an account sign-in";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "Admin successfully created";
  responseData.status = true;
  responseData.data = admin;
  return res.json(responseData);
}
const editAdmin = async (req,res)=>{
  const data = req.body;
  const id = req.params.id;
  if(!data){
    responseData.message = "data is required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const admin = await models.user.update(
    {
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName
    },
    {
      where:{
        id:id
      }
    }
  );
  responseData.message = "completed";
  responseData.status = true;
  responseData.data = undefined;
  return res.json(responseData)
}
const deleteAdmin = async (req,res)=>{
  const id = req.params.id
  const user = await models.user.destroy(
    {
      where:{id:id}
    }
  );
  responseData.message = "Account Deleted";
  responseData.status = true;
  responseData.data = user;
  return res.json(responseData)
}
const getAdmin = async (req,res)=>{
  const id = req.params.id;
  const data = await models.user.findOne(
    {
      where:{id:id}
    }
  )
  responseData.message = "completed";
  responseData.status = true;
  responseData.data = data;
  return res.json(responseData)
}
const getAllAdmin = async (req,res)=>{
  const data = await models.user.findAll()
  responseData.message = "completed";
  responseData.status = true;
  responseData.data = data;
  return res.json(responseData)
}
const resetAdminPassword = async (req,res)=>{
  data = req.body;
  const user = await models.user.findOne(
    {
      where:{id:req.user.id}
    }
  );
  const checkPassword = bcrypt.compareSync(data.password, user.password);
  if(checkPassword){
    if(data.newPassword === data.confirmPassword){
      const saltRounds = 10 
      const salt = bcrypt.genSaltSync(saltRounds);

      const hash = bcrypt.hashSync(data.newPassword, salt);
      
      data.newPassword = hash
      await models.user.update(
        {
          password:data.newPassword
        },
        {
          where:{id:req.user.id}
        }
      );
      responseData.message = "password changed";
      responseData.status = true;
      responseData.data = undefined;
      return res.json(responseData);
    } else {
      responseData.message = "password did not match";
      responseData.status = false;
      responseData.data = null;
      return res.json(responseData);
    }
  } else{
    responseData.message = "incorrect password";
    responseData.status = false;
    responseData.data = null;
    return res.json(responseData);
  }
}
module.exports = {
  createAdmin,
  editAdmin,
  deleteAdmin,
  getAdmin,
  getAdmin,
  getAllAdmin,
  resetAdminPassword
}