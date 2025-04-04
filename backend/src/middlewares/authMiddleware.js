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

// 中间件：权限检查（管理员）
exports.requireAdmin = (req, res, next) => {
    if (req.user == null || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Need admin privilege.' });
    }
    next();
};