const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users")
const tokenVerifier = require("../middleware/jwt_verifier")

router.get("/get/all", UserController.get_all);
router.get("/get/:login", tokenVerifier, UserController.get_all_by_login);
// router.get("/:login", UserController.get_all_by_login);
router.post("/add", UserController.add_one);
router.post("/auth", UserController.auth);
router.delete("/delete/all-login/:login", UserController.delete_all_by_login)
router.delete("/delete/all", UserController.delete_all)
router.delete("/delete/:login", UserController.delete_one_by_login)
module.exports = router;