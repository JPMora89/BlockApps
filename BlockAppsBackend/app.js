"use strict";

const express = require("express");
const cors = require("cors");
const balancesRoutes = require("./Routes/balances");
const GeneralTreasuryRoutes = require("./Routes/generalTreasury");
const subsidiariesRoutes = require("./Routes/subsidiaries");
const transactionRoutes = require("./Routes/transactions");

const { NotFoundError } = require("./expressError");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/balances", balancesRoutes);
app.use("/generaltreasury", GeneralTreasuryRoutes);
app.use("/subsidiaries", subsidiariesRoutes);
app.use("/transactions", transactionRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
