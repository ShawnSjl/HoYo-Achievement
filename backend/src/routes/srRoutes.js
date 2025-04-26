const express = require("express");
const srAchievementController = require("../controllers/srAchievementController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/all", authenticateToken, srAchievementController.getAllAchievement);
router.put("/user-update", authenticateToken, srAchievementController.updateUserAchievement);
router.get("/branch", srAchievementController.getBranches);

module.exports = router;