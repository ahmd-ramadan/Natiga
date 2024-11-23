const router = require("express").Router();
const { natigaCtrl } = require("../controllers/natiga.controller");
const { asyncHandler } = require("../middlewares/asynchandler");

router.post(
  "/read-students-data",
  asyncHandler(natigaCtrl.readStudentsDataFromSheet)
);

router.post(
  "/read-materials-data",
  asyncHandler(natigaCtrl.readMatrielsDataFromSheet)
);

router.get("/get-student", asyncHandler(natigaCtrl.getStudentGrades));

module.exports = router;
