
const { Router } = require("express");

const router = Router();

let SuperController = require("../controllers/Super");

router.post("/create",SuperController.create);
router.get("/all",SuperController.all);
router.get("/:id",SuperController.get);
router.delete("/delete/:id",SuperController.delete);
router.put("/:id",SuperController.update);

module.exports = router;