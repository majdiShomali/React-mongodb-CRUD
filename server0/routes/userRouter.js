const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/api/users", userController.allUsers);
router.post("/api/users", userController.newUser);
router.post("/api/usersLogin", userController.newUserLogin);
router.get("/api/users/:id", userController.oneUser);
router.put("/api/users/:id", userController.updateUser);
router.delete("/api/users/:id", userController.deleteUser);


module.exports = router;