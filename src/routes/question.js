
const { Router } = require("express");

const router = Router();

let questionController = require("../controllers/question");

router.post("/create",questionController.create);
router.get("/all",questionController.all);
router.get("/:id",questionController.get);
router.delete("/:id",questionController.delete);
router.put("/:id",questionController.update);

module.exports = router;