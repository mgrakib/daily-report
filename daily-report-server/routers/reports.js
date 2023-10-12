const router = require('express').Router();
const { updateReport } = require("../controller/report");


router.post("/update-report", updateReport);



module.exports = router;
