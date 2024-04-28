const express = require("express")
//controllers
const userController = require("../controllers/user.controller");

//Middlewares


const userRouter = express.Router();


//Public
userRouter.get("/username/:username", userController.getUserByUsername);

//Auth
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/refreshToken", userController.refreshToken)

module.exports = userRouter;