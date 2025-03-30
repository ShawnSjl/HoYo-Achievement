const jwt = require("jsonwebtoken");

// Authenticate
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 如果没有提供token，默认为访客
    if (!authHeader) {
        req.user = null;
        return next();
    }

    // 去掉 "Bearer " 只保留 Token
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });

        req.user = decoded;
        next();
    });
};