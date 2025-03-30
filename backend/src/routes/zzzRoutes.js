const express = require("express");
const zzzAchievementController = require("../controllers/zzzAchievementController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/all", authenticateToken, zzzAchievementController.getAllAchievement);
router.get("/class", authenticateToken, zzzAchievementController.getAllAchievementByClassId);

router.get("/user-complete", authenticateToken, zzzAchievementController.getUserCompleteAchievementZZZ);
router.get("/user-un-complete", authenticateToken, zzzAchievementController.getUserUnCompleteAchievementZZZ);
router.put("/user-update", authenticateToken, zzzAchievementController.updateUserAchievementZZZ);

module.exports = router;