const shortid = require('shortid');
const URL = require("../models/url")

async function handleGenerateNewShortUrl(req,res){
  const body = req.body;
  if(!body || !body.url) return res.status(400).json({error:"URL is required"});

  const shortId = shortid();

  try {
    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });
    return res.json({id:shortId});
  } catch (err) {
    console.error('Failed to create URL document:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId : shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    
    return res.redirect(entry.redirectURL);
  } catch (err) {
    console.error('Failed to redirect URL:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleGetAnalytics(req,res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({totalClicks:result.visitHistory.length , analytics:result.visitHistory});
}



module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleGetAnalytics,
};