/** @format */

const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require('./user')

router.use("/api/v1/u", authRouter);
router.use("/api/v1/u", userRouter);

module.exports = router;
