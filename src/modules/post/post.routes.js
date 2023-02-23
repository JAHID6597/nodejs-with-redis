const express = require("express");
const router = express.Router();
const getValueByKey = require("../shared/middleware/get-value-by-key.middleware");
const {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
} = require("./post.controllers");

router.post("/", createPost);

router.get("/:id", getValueByKey("id", true), getPost);

router.get("/", getValueByKey("posts", false), getPosts);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

module.exports.postRoutes = router;
