const Post = require("./post.model");
const addValueBySingleAndMultiKeyInRedis = require("../../database/redis/utils/add-value-by-single-and-multi-key.utils");
const addValueByKeyInRedis = require("../../database/redis/utils/add-value-by-key.utils");
const deleteValueBySingleAndMultiKeyFromRedis = require("../../database/redis/utils/delete-value-by-single-and-multi-key.utils");
const updateValueByKeyInRedis = require("../../database/redis/utils/update-value-by-key.utils");
const updateValueBySingleAndMultiKeyInRedis = require("../../database/redis/utils/update-value-by-single-and-multi-key.utils");

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    const post = new Post({ title, body });
    const newPost = await post.save();
    if (newPost) {
      await addValueBySingleAndMultiKeyInRedis(
        String(newPost._id),
        "posts",
        newPost
      );
    }

    res.status(200).send(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send("No such post exists");
    }

    addValueByKeyInRedis(id, post);
    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      addValueByKeyInRedis("posts", posts);
    }

    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    if (updatedPost) {
      updateValueBySingleAndMultiKeyInRedis(id, "_id", "posts", updatedPost);
    }

    res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      await deleteValueBySingleAndMultiKeyFromRedis(id, "_id", "posts");
      return res.status(200).send(deletedPost);
    }

    return res.status(400).send("Failed to delete this post.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

module.exports.createPost = createPost;
module.exports.getPost = getPost;
module.exports.getPosts = getPosts;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
