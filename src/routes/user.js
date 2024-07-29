
const { Router } = require("express");

const router = Router();

let UserController = require("../controllers/user");

router.post("/create",UserController.create);
router.get("/all",UserController.all);
router.get("/:id",UserController.get);
router.delete("/delete/:id",UserController.delete);
router.put("/:id",UserController.update);

module.exports = router;