const express = require("express");
const authRouter = require("./authRoutes");
const zzzRouter = require("./zzzRoutes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/zzz", zzzRouter);

module.exports = router;