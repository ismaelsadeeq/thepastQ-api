const models = require('../models');
const uuid = require('uuid');
const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const getLevelsDeparment = async (req,res)=>{
  const departmentId = req.params.id;
  const levels = await models.level.findAll({
    where:{
      departmentId:departmentId
    }
  });
  if(!levels){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = levels;
  return res.json(responseData);
}
const createLevel = async(req,res)=>{
  const data = req.body;
  const deptId = req.params.id;
  if(!data){
    responseData.message = "data required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const level = await models.level.create(
    {
      id:uuid.v4(),
      name:data.name,
      departmentId:deptId
    }
  );
  if(!level){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = level;
  return res.json(responseData);
}
const editLevel = async (req,res)=>{
  const data = req.body;
  const id = req.params.id;
  if(!data){
    responseData.message = "data required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const level = await models.level.update(
    {
      name:data.name,
      departmentId:data.departmentId
    },
    {
      where:{
        id:id
      }
    }
  );
  if(!level){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = level;
  return res.json(responseData);
}
const deleteLevel = async(req,res)=>{
  const id = req.params.id;
  const level = await models.level.destroy(
    {
      where:{
        id:id
      }
    }
  );
  responseData.message = "success";
  responseData.status = true;
  responseData.data = level;
  return res.json(responseData);
}
module.exports = {
  getLevelsDeparment,
  createLevel,
  editLevel,
  deleteLevel
}