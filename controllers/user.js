const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth")
const User = require('../models/user');

async function handleUsersignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }
  );
  if (!user) {
    return res.render("login", {
      error: "Invalid Credentials",
    });
  }

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

async function handleUserLogout(req, res) {
  res.clearCookie("uid");
  return res.redirect("/login");
}

module.exports = { handleUsersignup, handleUserLogin, handleUserLogout };