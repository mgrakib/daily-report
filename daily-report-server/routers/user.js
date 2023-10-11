const { getSingleUser, transferUser } = require('../controller/user');
const router = require('express').Router();


router.get("/user", getSingleUser);
router.patch("/user", transferUser);


module.exports = router