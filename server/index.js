const express = require("express");
const cors = require("cors");
process.env.PWD = process.cwd();

// routes
const eventRouter = require("./routes/event");
const ticketRouter = require("./routes/ticket");
const userRouter = require("./routes/user");
const swaggerRouter = require("./routes/swagger");
const orderRouter = require("./routes/order")
const { authRouter, isLoggedIn } = require("./routes/auth");

const app = express();
app.use(cors());

const PORT = 7050;

// routes
app.use("/api/event", eventRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/auth", authRouter);

app.use("/api-docs", swaggerRouter);
app.use("/public", express.static("public"));

app.listen(PORT, () => console.log(`Server running on 127.0.0.1:${PORT}`));
