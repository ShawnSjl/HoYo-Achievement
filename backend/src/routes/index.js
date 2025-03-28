const express = require("express");
const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;