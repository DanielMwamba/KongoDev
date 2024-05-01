const express = require("express")
//controllers
const postController = require("../controllers/post.controller");

//Middlewares
const {verifyToken} = require("../middlewares/verifyToken.middleware")


const postRouter = express.Router()

//Public
postRouter.get("/", postController.getAllPosts);



//Protected
postRouter.get("/user-all", verifyToken, postController.getUserAllPosts)
postRouter.post("/", verifyToken, postController.addPost);
postRouter.put("/:id", verifyToken, postController.updatePost);


module.exports = postRouter
