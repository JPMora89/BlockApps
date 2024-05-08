"use strict";



const SECRET_KEY = process.env.SECRET_KEY || "ManchesterUnited07";

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? "blockapps_test"
      : process.env.DATABASE_URL || "postgresql:///blockapps";
}




module.exports = {
  SECRET_KEY,
  PORT,
  getDatabaseUri,
};
