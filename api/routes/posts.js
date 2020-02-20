const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const tokenVerifier = require("../middleware/jwt_verifier");

router.post("/add", PostsController.add_one);
router.post("/add-more", PostsController.add_more);
router.get("/get/all", PostsController.get_all);
// router.get("/get/:postName", postsController.get_one_by_name);

module.exports = router;