const router = require('express').Router();
const { updateReport, getOpeList } = require("../controller/report");


router.post("/update-report", updateReport);
router.get("/workstation-ope", getOpeList);



module.exports = router;
