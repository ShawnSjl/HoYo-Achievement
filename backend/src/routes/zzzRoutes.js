const express = require("express");
const achievementController = require("../controllers/achievementController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/all", achievementController.getDefaultAchievementZZZ);
router.get("/user-all", authenticateToken, achievementController.getUserAchievementZZZ);
router.get("/user-complete", authenticateToken, achievementController.getUserCompleteAchievementZZZ);
router.get("/user-un-complete", authenticateToken, achievementController.getUserUnCompleteAchievementZZZ);

module.exports = router;