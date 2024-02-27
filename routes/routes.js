
const express = require("express");
const { registerUser } = require("../controllers/user/register");
const { emailVerify } = require("../controllers/user/emailVerify");
const { loginUser } = require("../controllers/user/login");
const { forgotPassword } = require("../controllers/user/forgot-password");
const { verifyResetLink } = require("../controllers/user/verifyResetLink");
const { setNewPassword } = require("../controllers/user/setNewPassword");
const { editProfile } = require("../controllers/user/editProfile");
const { createTodo } = require("../controllers/todo/create");
const { readTodo } = require("../controllers/todo/read");
const { deleteTodo } = require("../controllers/todo/delete");
const { editTodo } = require("../controllers/todo/edit");
const router = express.Router();

//routes
router.route("/api/register").post(registerUser);
router.route("/:id/verify/:token").get(emailVerify);
router.route("/api/login").post(loginUser);
router.route("/api/forgot-password").post(forgotPassword);
router.route("/:id/:token").get(verifyResetLink);
router.route("/:id/:token").post(setNewPassword);
router.route("/api/v1/edit-profile").post(editProfile);
//todo routes
router.route("/addTodo/v1/:id").post(createTodo);
router.route("/api/v1/:id").get(readTodo);
router.route("/api/v1/:id").delete(deleteTodo);
router.route("/api/v1/:id").put(editTodo);

module.exports = router;