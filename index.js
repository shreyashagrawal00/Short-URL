const express = require('express');
const {connectToMongoDB} = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");  
const Path = require("path");
const staticRouter = require("./routes/staticRouter");  
const app = express();
const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"));
app.use("/url",urlRouter);

app.set("view engine","ejs");
app.set("views" , Path.resolve("./views"));

app.use("/",staticRouter);  

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