const router = require('express').Router();
const { updateReport, getOpeList ,getActiveLockupEntryReleaseController} = require("../controller/report");


router.post("/update-report", updateReport);
router.get("/workstation-ope", getOpeList);
router.get("/update-info", getActiveLockupEntryReleaseController);



module.exports = router;
