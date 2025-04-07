const express = require('express');
const routers = require("./routes/index");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use("/api", routers);

module.exports = app;
