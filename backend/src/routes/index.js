const express = require("express");
const authRouter = require("./authRoutes");
const zzzRouter = require("./zzzRoutes");
const srRouter = require("./srRoutes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/zzz", zzzRouter);
router.use("/sr", srRouter);

module.exports = router;