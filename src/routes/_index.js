const { Router } = require("express");
const checkToken =require("../middlewares/check-token")
const router = Router();

const categoryRouter = require("./category");
const productRouter = require("./product");
const superRouter = require("./super");
const userRouter = require("./user");
const loginRouter = require("./login");
const phoneRouter = require("./phone");
const adsRouter = require("./ads");
const questionRouter = require("./question");


router.use("/category",categoryRouter);
router.use("/product",productRouter);
router.use("/super",superRouter);
router.use("/user",userRouter);

router.use("/login",loginRouter);
router.use("/phone",phoneRouter);

router.use("/ads",adsRouter);
router.use("/question",questionRouter);


module.exports = router;
