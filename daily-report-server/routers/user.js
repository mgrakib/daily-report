const { getSingleUser, transferUser, findUserPreviousHistory } = require('../controller/user');
const router = require('express').Router();


router.get("/user", getSingleUser);
router.get("/user/h", findUserPreviousHistory);
router.patch("/user", transferUser);


module.exports = router