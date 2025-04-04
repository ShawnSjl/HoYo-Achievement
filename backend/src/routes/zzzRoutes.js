const express = require("express");
const zzzAchievementController = require("../controllers/zzzAchievementController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/all", authenticateToken, zzzAchievementController.getAllAchievement);
router.put("/user-update", authenticateToken, zzzAchievementController.updateUserAchievement);

module.exports = router;