const SuperModel = require("../models/super_model");
const cryptoRandomString = require("secure-random-string");
let {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} = require("../utils/errors");

class SuperController {
  async create(req, res, next) {
    try {
      let { fullname } = req.body;
      let login = cryptoRandomString({ length: 10 });
      let password = cryptoRandomString({ length: 15 });
      let Super = await SuperModel.create({
        fullname,
        login,
        password
      });

      return res.status(201).json({
        message: "success",
        data: Super,
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
        
        fullname,
        login,
        password
     } = req.body;
      let value = await SuperModel.updateOne(
        { _id: id },
        {
            fullname,
            login,
            password
        }
      );
      if (value) {
        let Super = await SuperModel.findById(id);
        return res.status(200).json({
          message: "Super is updated",
          data: Super,
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
      let value = await SuperModel.deleteOne({ _id: id });
      if (value.deletedCount > 0) {
        return res.status(200).json({
          message: "Super is deleted",
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
      let all = await SuperModel.find({});
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
      let Super = await SuperModel.findById(id);
      if (Super) {
        return res.status(200).json({
          message: "success",
          data: Super,
        });
      }
      return next(new BadRequestError(400, "Not found"));
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

}

module.exports = new SuperController();
