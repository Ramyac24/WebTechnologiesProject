const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/involved", userController.involved);
router.post("/search", userController.search);
router.post("/getChats", userController.getChats);

module.exports = router;
