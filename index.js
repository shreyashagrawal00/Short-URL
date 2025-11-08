const express = require('express');
const {connectToMongoDB} = require("./connect");
const urlRouter = require("./routes/url");
const URL = require("./models/url");  
const app = express();
const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"));
app.use("/url",urlRouter);

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