const { getSingleUser } = require('../controller/user');
const router = require('express').Router();


router.get("/user", getSingleUser);


module.exports = router