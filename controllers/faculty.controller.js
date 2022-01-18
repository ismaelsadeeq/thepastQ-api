const models = require('../models');
const uuid = require('uuid');
const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const getFaculties = async (req,res)=>{
  const faculties = await models.faculty.findAll();
  if(!faculties){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = faculties;
  return res.json(responseData);
}
const createFaculty = async(req,res)=>{
  const data = req.body;
  if(!data.name){
    responseData.message = "faculty name required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const faculty = await models.faculty.create(
    {
      id:uuid.v4(),
      name:data.name
    }
  );
  if(!faculty){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = faculty;
  return res.json(responseData);
}
const editFaculty = async (req,res)=>{
  const data = req.body;
  const id = req.params.id;
  if(!data.name){
    responseData.message = "faculty name required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const faculty = await models.faculty.update(
    {
      name:data.name
    },
    {
      where:{
        id:id
      }
    }
  );
  if(!faculty){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = faculty;
  return res.json(responseData);
}
const deleteFaculty = async(req,res)=>{
  const id = req.params.id;
  const faculty = await models.faculty.destroy(
    {
      where:{
        id:id
      }
    }
  );
  responseData.message = "success";
  responseData.status = true;
  responseData.data = faculty;
  return res.json(responseData);
}
module.exports = {
  getFaculties,
  createFaculty,
  editFaculty,
  deleteFaculty
}