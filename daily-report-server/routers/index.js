/** @format */

const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require('./user')
const reportRouter = require('./reports')

router.use("/api/v1/u", authRouter);
router.use("/api/v1/u", userRouter);
router.use("/api/v1/r", reportRouter);

module.exports = router;
