const models = require('../models');
const uuid = require('uuid');
const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const getDepartments = async (req,res)=>{
  const departments = await models.department.findAll();
  if(!departments){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = departments;
  return res.json(responseData);
}
const getDeparmentOfFaculty = async (req,res)=>{
  const facultyId = req.params.id;
  const departments = await models.department.findAll({
    where:{
      facultyId:facultyId
    }
  });
  if(!departments){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = departments;
  return res.json(responseData);
}
const createDepartment = async(req,res)=>{
  const data = req.body;
  if(!data.name){
    responseData.message = "department name required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const department = await models.department.create(
    {
      id:uuid.v4(),
      name:data.name
    }
  );
  if(!department){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = department;
  return res.json(responseData);
}
const editDepartment = async (req,res)=>{
  const data = req.body;
  const id = req.params.id;
  if(!data.name){
    responseData.message = "department name required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const department = await models.department.update(
    {
      name:data.name
    },
    {
      where:{
        id:id
      }
    }
  );
  if(!department){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = department;
  return res.json(responseData);
}
const deleteDepartment = async(req,res)=>{
  const id = req.params.id;
  const department = await models.department.destroy(
    {
      where:{
        id:id
      }
    }
  );
  responseData.message = "success";
  responseData.status = true;
  responseData.data = department;
  return res.json(responseData);
}
module.exports = {
  getDepartments,
  getDeparmentOfFaculty,
  createDepartment,
  editDepartment,
  deleteDepartment
}