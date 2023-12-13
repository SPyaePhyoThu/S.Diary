const express = require("express");
const router = express.Router();
const diaryController = require("../controller/diaryController");
const authController = require("../controller/authController");

router.use(authController.protect);
router.get("/MomentOfTheMonth", diaryController.getMomentsOfTheMonth);

router
  .route("/")
  .get(diaryController.getAllDiaries)
  .post(diaryController.setUserId, diaryController.createDiary);

router
  .route("/:id")
  .get(diaryController.getDiary)
  .delete(diaryController.deleteDiary)
  .patch(diaryController.updateDiary);

module.exports = router;
