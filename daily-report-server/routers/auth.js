/** @format */

const router = require("express").Router();
const {createUserController } = require('../controller/auth')

router.post("/create-user", createUserController);

module.exports = router;
