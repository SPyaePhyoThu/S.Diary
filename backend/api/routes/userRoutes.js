const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");

const router = express.Router();
const methodNotAllowed = (req, res, next) => res.status(405).send();
router.route("/login").post(authController.login).all(methodNotAllowed);

app.use((req, res, next) => {
  const methods = router.stack
    // Filter for the route that matches the currently matched route
    .filter((layer) => layer.route.path === req.path)[0].route.methods;
  if (!methods[req.method]) methodNotAllowed(req, res, next);
  else next();
});

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
