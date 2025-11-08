const express = require("express");
const {handleGenerateNewShortUrl, handleRedirectUrl} =require("../controllers/url")
const router = express.Router();

router.post('/',handleGenerateNewShortUrl);
router.get('/:shortId',handleRedirectUrl);

module.exports = router;