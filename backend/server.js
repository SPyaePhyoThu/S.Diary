require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = require("./app");

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to database & listening on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//listen for requests
