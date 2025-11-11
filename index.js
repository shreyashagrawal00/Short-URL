const express = require('express');
const {connectToMongoDB} = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");  
const Path = require("path");
const staticRouter = require("./routes/staticRouter");  
const UserRouter = require("./routes/user");
const {restricedToLoginUserOnly,checkAuth} = require("./middlewares/auth")
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8002;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"));

app.set("view engine","ejs");
app.set("views" , Path.resolve("./views"));


app.use("/url",restricedToLoginUserOnly,urlRouter);
app.use("/",checkAuth,staticRouter);  
app.use("/user",UserRouter);

app.get("/",(req,res)=>{
  res.render("index");
})

app.get("/:shortId",async(req,res)=>{
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate({
    shortId,
  },{ $push: {
    visitHistory:{
      timestamp:Date.now(),
    },
  }})
  res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>{console.log(`Server Started At PORT:${PORT}`)});