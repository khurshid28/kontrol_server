const AdsModel = require("../models/ads_model");
const cryptoRandomString = require("secure-random-string");
let { InternalServerError, BadRequestError, NotFoundError } = require("../utils/errors");

class AdsController {
  async create(req, res, next) {
    try {
      let { title,filename } = req.body;
    
      let ad = await AdsModel.create({
        title,
        image: filename ? "/static/ads/" + filename : undefined,
      });

      return res.status(201).json({
        message: "success",
        data: ad,
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }

  async update(req, res, next) {
    try {
      let { id } = req.params;
      let { title,filename } = req.body;
      let value = await AdsModel.updateOne({ _id: id },{
        title,
        image: filename ? "/static/ads/" + filename : undefined,
      });
      if (value) {
        let ad = await AdsModel.findById(id);
        return res.status(200).json({
          message: "ad is updated",
          data: ad
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
      let value =await AdsModel.deleteOne({_id:id})
     if (value.deletedCount > 0) {
        return res.status(200).json({
            message: "Category is deleted",
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
     
      let all = await AdsModel.find({})
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
      let ad = await AdsModel.findById(id)
      if (ad) {
        return res.status(200).json({
            message: "success",
            data:ad
           
          });
      }
      return next(new BadRequestError(400, "Not found"));
     
    } catch (error) {
      console.log(error);
      return next(new InternalServerError(500, error.message));
    }
  }
  
  
}

module.exports = new AdsController();
