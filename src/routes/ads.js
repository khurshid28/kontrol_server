
const { Router } = require("express");

const router = Router();

let adsController = require("../controllers/ads");
const upload = require("../utils/upload");

router.post("/create",upload("public/category/").single("image"),adsController.create);
router.get("/all",adsController.all);
router.get("/:id",adsController.get);
router.delete("/delete/:id",adsController.delete);
router.put("/:id",upload("public/category/").single("image"),adsController.update);

module.exports = router;