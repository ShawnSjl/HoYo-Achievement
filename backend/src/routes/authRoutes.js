const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken, requireAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authenticateToken, requireAdmin, authController.register);
router.get("/get-all", authenticateToken, requireAdmin, authController.getAllUsers);
router.delete("/delete", authenticateToken, requireAdmin, authController.deleteUser);

module.exports = router;