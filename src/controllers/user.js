const UserModel = require("../models/user_model");
const cryptoRandomString = require("secure-random-string");
let {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors");

class UserController {
  async create(req, res, next) {
    try {
      let { fullname,phone } = req.body;
    
      let User = await UserModel.create({
        fullname,
        phone,
        
      });

      return res.status(201).json({
        message: "success",
        data: User,
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

  async update(req, res, next) {
    try {
      let { id } = req.params;
      let { 
        
        fullname,phone
     } = req.body;
      let value = await UserModel.updateOne(
        { _id: id },
        {
            fullname,phone
        }
      );
      if (value) {
        let User = await UserModel.findById(id);
        return res.status(200).json({
          message: "User is updated",
          data: User,
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
      let value = await UserModel.deleteOne({ _id: id });
      if (value.deletedCount > 0) {
        return res.status(200).json({
          message: "User is deleted",
          data: {
            _id: id,
          },
        });
      } else {
        return next(new NotFoundError(404, "Not found"));
      }
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

  async all(req, res, next) {
    try {
      let all = await UserModel.find({});
      return res.status(200).json({
        message: "success",
        data: all,
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  async get(req, res, next) {
    try {
      let { id } = req.params;
      let User = await UserModel.findById(id);
      if (User) {
        return res.status(200).json({
          message: "success",
          data: User,
        });
      }
      return next(new BadRequestError(400, "Not found"));
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

}

module.exports = new UserController();
