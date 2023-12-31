const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);
router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.delete("/deleteMe", userController.deleteMe);
router.patch("/updateDatesArray", userController.updateDatesArray);
router.patch(
  "/updateMe",
  userController.uploadPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
