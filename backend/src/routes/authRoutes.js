const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken, requireAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authenticateToken, requireAdmin, authController.register);
router.get("/get-all", authenticateToken, requireAdmin, authController.getAllUsers);
router.put("/change-password", authenticateToken, authController.changePassword);
router.delete("/delete", authenticateToken, authController.deleteUser);

module.exports = router;