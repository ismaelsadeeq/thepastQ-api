const models = require('../models');
const uuid = require('uuid');
const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const getCoursesOfALevelSemester = async (req,res)=>{
  const levelId = req.params.id;
  const data = req.body;
  if(!data.semester){
    responseData.message = "semester required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const courses = await models.course.findAll({
    where:{
      levelId:levelId,
      semester:data.semester
    }
  });
  if(!courses){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = courses;
  return res.json(responseData);
}
const createCourse = async(req,res)=>{
  const data = req.body;
  const levelId = req.params.id;
  if(!data){
    responseData.message = "data required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const course = await models.course.create(
    {
      id:uuid.v4(),
      name:data.name,
      unit:data.unit,
      title:data.title,
      levelId:levelId,
      semester:data.semester
    }
  );
  if(!course){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = course;
  return res.json(responseData);
}
const editCourse = async (req,res)=>{
  const data = req.body;
  const id = req.params.id;
  if(!data){
    responseData.message = "data required";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  const course = await models.course.update(
    {
      name:data.name,
      levelId:data.levelId,
      unit:data.unit,
      title:data.title,
      semester:data.semester
    },
    {
      where:{
        id:id
      }
    }
  );
  if(!course){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = course;
  return res.json(responseData);
}
const deleteCourse = async(req,res)=>{
  const id = req.params.id;
  const course = await models.course.destroy(
    {
      where:{
        id:id
      }
    }
  );
  responseData.message = "success";
  responseData.status = true;
  responseData.data = course;
  return res.json(responseData);
}
module.exports = {
  getCoursesOfALevelSemester,
  createCourse,
  editCourse,
  deleteCourse
}