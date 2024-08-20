const QuestionModel = require("../models/question_model");
let { InternalServerError, BadRequestError, NotFoundError } = require("../utils/errors");

class QuestionController {
  async create(req, res, next) {
    try {
      let { question,answer } = req.body;
      console.log(req.body);
    
      let Question = await QuestionModel.create({
        question,answer
      });

      return res.status(201).json({
        message: "success",
        data: Question,
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

  async update(req, res, next) {
    try {
      let { id } = req.params;
      let { question,answer } = req.body;
      let value = await QuestionModel.updateOne({ _id: id },{
        question,answer 
      });
      if (value) {
        let Question = await QuestionModel.findById(id);
        return res.status(200).json({
          message: "Question is updated",
          data: Question
        });
      } else {
        return next(new BadRequestError(400, "Not found"));
      }
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

  async delete(req, res, next) {
    try {
      let { id } = req.params;
      let value = await QuestionModel.deleteOne({_id:id})
     if (value.deletedCount > 0) {
        return res.status(200).json({
            message: "Question is deleted",
            data :{
              _id :id
            }
           
          });
     }else{
        return next(new NotFoundError(404, "Not found"));
     }
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

  async all(req, res, next) {
    try {
     
      let all = await QuestionModel.find({})
      return res.status(200).json({
        message: "success",
        data:all
       
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async get(req, res, next) {
    try {
      let {id} =req.params;
      let Question = await QuestionModel.findById(id)
      if (Question) {
        return res.status(200).json({
            message: "success",
            data:Question
           
          });
      }
      return next(new BadRequestError(400, "Not found"));
     
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  
  
}

module.exports = new QuestionController();
