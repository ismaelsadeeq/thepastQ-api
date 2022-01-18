const models = require('../models');
const uuid = require('uuid');
const multerConfig = require('../config/multer');

const responseData = {
	status: true,
	message: "Completed",
	data: null
}
const getQuestionsOfACourse = async (req,res)=>{
  const courseId = req.params.id;
  const questions = await models.course.findAll({
    where:{
      courseId:courseId,
    }
  });
  if(!questions){
    responseData.message = "something went wrong";
    responseData.status = false;
    responseData.data = undefined;
    return res.json(responseData);
  }
  responseData.message = "success";
  responseData.status = true;
  responseData.data = questions;
  return res.json(responseData);
}
const createQuestion = async(req,res)=>{
  multerConfig.singleUpload(req, res, async function(err) {
  if (err instanceof multer.MulterError) {
    responseData.status=false,
    res.statusCode = 200;
    responseData.message = err.message  + "something went wrong"
    return res.json(responseData);
  } else if (err) {
    responseData.status=false,
    res.statusCode = 200;
    responseData.message = err
    return res.json(responseData);
  } else if(req.body){
    const data = req.body;
    if (!req.file) {
      res.statusCode = 200;
      responseData.status = false;
      responseData.message = 'Question picture is required'
      return res.json(
        responseData
      );
    }
    const courseId = req.params.id;
    if(!data){
      responseData.message = "data  is required";
      responseData.status = false;
      responseData.data = undefined;
      return res.json(responseData);
    }
    const question = await models.question.create(
      {
        id:uuid.v4(),
        courseId:courseId,
        year:data.year,
        title:data.title,
        source:req.file.path
      }
    );
    if(!question){
      responseData.message = "something went wrong";
      responseData.status = false;
      responseData.data = undefined;
      return res.json(responseData);
    }
    responseData.message = "success";
    responseData.status = true;
    responseData.data = question;
    return res.json(responseData);
  }
  })
  
}
const editQuestion = async (req,res)=>{
  multerConfig.singleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      responseData.status=false,
      res.statusCode = 200;
      responseData.message = err.message  + "something went wrong"
      return res.json(responseData);
    } else if (err) {
      responseData.status=false,
      res.statusCode = 200;
      responseData.message = err
      return res.json(responseData);
    } else if(req.body){
      const data = req.body;
      const questionId = req.params.id;
      if (!req.file) {
        res.statusCode = 200;
        responseData.status = false;
        responseData.message = 'Question picture is required'
        return res.json(
          responseData
        );
      }
      if(!data){
        responseData.message = "data  is required";
        responseData.status = false;
        responseData.data = undefined;
        return res.json(responseData);
      }
      const question = await models.question.update(
        {
          courseId:data.courseId,
          year:data.year,
          title:data.title,
          source:req.file.path
        },{
          where:{
            id:questionId
          }
        }
      );
      if(!question){
        responseData.message = "something went wrong";
        responseData.status = false;
        responseData.data = undefined;
        return res.json(responseData);
      }
      responseData.message = "success";
      responseData.status = true;
      responseData.data = question;
      return res.json(responseData);
    }
    })
}
const deleteQuestion = async(req,res)=>{
  const id = req.params.id;
  const question = await models.question.destroy(
    {
      where:{
        id:id
      }
    }
  );
  responseData.message = "success";
  responseData.status = true;
  responseData.data = question;
  return res.json(responseData);
}
module.exports = {
  getQuestionsOfACourse,
  createQuestion,
  editQuestion,
  deleteQuestion
}