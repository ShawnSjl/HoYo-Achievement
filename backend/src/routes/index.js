const express = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const zzzRouter = require("./zzzRoutes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/zzz", zzzRouter);

module.exports = router;