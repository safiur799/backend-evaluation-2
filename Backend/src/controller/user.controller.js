const express = require("express");
const User = require("../model/user.model");
const router = express.router();

router.post("/users", async (req, res) => {
  try {
    const User = await User.create(req.body);
  } catch (err) {}
});
